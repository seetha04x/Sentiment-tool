from flask import Flask, jsonify
from textblob import TextBlob
from pymongo import MongoClient

app = Flask(__name__)

MONGO_URI = "mongodb://localhost:27017/sentimenttool"
client = MongoClient(MONGO_URI)
db = client.get_database()

def calculate_polarity(text):
    if not text:
        return 0.0
    return TextBlob(text).sentiment.polarity

def classify_sentiment(polarity):
    if polarity > 0.1:
        return "positive"
    elif polarity < -0.1:
        return "negative"
    else:
        return "neutral"

@app.route("/process", methods=["POST"])
def process_feedback():
    # 1. Query unprocessed records
    unprocessed_docs = list(db.feedbacks.find({"status": "unprocessed"}))
    
    if not unprocessed_docs:
        return jsonify({"message": "No unprocessed feedback found.", "processedCount": 0})

    processed_count = 0

    # 2. Process sentiments directly in Python
    for doc in unprocessed_docs:
        feedback_text = doc.get("feedback", "")
        polarity = calculate_polarity(feedback_text)
        sentiment_label = classify_sentiment(polarity)

        # 3. Update MongoDB document
        db.feedbacks.update_one(
            {"_id": doc["_id"]},
            {"$set": {
                "sentimentScore": float(polarity),
                "status": str(sentiment_label)
            }}
        )
        processed_count += 1

    return jsonify({
        "message": "Sentiment batch processing complete!",
        "processedCount": processed_count
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)