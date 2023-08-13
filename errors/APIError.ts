import { AppError } from "./AppError";

export class APIError extends AppError {
    constructor(code: number, message: string, public originalError?: any) {
        super(code, message);
    }
}