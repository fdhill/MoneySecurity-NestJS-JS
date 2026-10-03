import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter {
  catch(exception, host) {
    const response = host.switchToHttp().getResponse();
    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = isHttp ? exception.getResponse() : null;

    const message =
      typeof payload === 'string'
        ? payload
        : (payload && payload.message) || exception.message;

    response.status(status).json({ success: false, message, data: null });
  }
}
