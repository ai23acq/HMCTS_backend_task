import { Response } from 'express';

export class ResponseHelper {
  static success<T>(res: Response, data: T, { statusCode = 200, message = 'success' } = {}) {
    return res.status(statusCode).json({ 
      success: true,
      message: message,
      data, 
    });
  }

  static error(res: Response, message: string, statusCode = 400, error?: any) {
    return res.status(statusCode).json({ success: false, message, error });
  }
}