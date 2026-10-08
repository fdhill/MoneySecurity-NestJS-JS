export class AppException extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppException';
  }
}

export class BadRequestException extends AppException {
  constructor(message) {
    super(message, 400);
    this.name = 'BadRequestException';
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedException';
  }
}

export class ForbiddenException extends AppException {
  constructor(message = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenException';
  }
}

export class NotFoundException extends AppException {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = 'NotFoundException';
  }
}

export class ConflictException extends AppException {
  constructor(message) {
    super(message, 409);
    this.name = 'ConflictException';
  }
}
