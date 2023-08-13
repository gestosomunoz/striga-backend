"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../errors/AppError");
function errorHandler(err, req, res, next) {
    if (err instanceof AppError_1.AppError) {
        res.status(err.code).json({ error: err.message });
    }
    else {
        // If it's API error, in the console we will see the full error coming from the API
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.errorHandler = errorHandler;
