"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const AppError_1 = require("./AppError");
class APIError extends AppError_1.AppError {
    constructor(code, message, originalError) {
        super(code, message);
        this.originalError = originalError;
    }
}
exports.APIError = APIError;
