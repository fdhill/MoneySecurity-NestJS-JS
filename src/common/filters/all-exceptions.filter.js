import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { AppException } from '../exceptions';

@Catch()
export class AllExceptionsFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let data = null;

    if (exception instanceof AppException) {
      status = exception.statusCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();
      message = typeof exResponse === 'string' ? exResponse : exResponse.message || 'Error';
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
