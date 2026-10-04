class ExpressError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "ExpressError";
        this.statusCode = Number.isInteger(statusCode) ? statusCode : 500;
        this.message = message;
    }
}
module.exports = ExpressError;