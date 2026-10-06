const axios = require("axios");

module.exports.triggerPySparkPipeline = async (req, res) => {
    try {
        // Send trigger signal to PySpark Flask service running on port 5000
        const response = await axios.post("http://127.0.0.1:5000/process");
        console.log("PySpark Response:", response.data);
        
        console.log("success");
        res.redirect("/dashboard/admin");
    } 
    catch (err) {
        console.error("Pipeline trigger failed:", err.message);
        console.log("failure");
        res.redirect("/dashboard/admin");
    }
};