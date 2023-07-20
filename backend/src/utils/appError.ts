enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export abstract class AppError extends Error {
  public readonly status: string;
  public readonly isOperational: boolean;
  public readonly statusCode: number;
  public readonly code: string;
  public readonly description: string;

  constructor(
    public readonly message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    code: string = 'ERR_GENERIC',
    description: string = 'An error occurred.'
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.statusCode = statusCode;
    this.code = code;
    this.description = description;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_VALIDATION',
    description: string = 'Validation error.'
  ) {
    super(message, HttpStatus.BAD_REQUEST, code, description);
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_AUTHENTICATION',
    description: string = 'Authentication failed.'
  ) {
    super(message, HttpStatus.UNAUTHORIZED, code, description);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_AUTHORIZATION',
    description: string = 'Authorization failed.'
  ) {
    super(message, HttpStatus.FORBIDDEN, code, description);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_INTERNAL_SERVER',
    description: string = 'Internal server error.'
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code, description);
  }
}

export class NotFoundError extends AppError {
  constructor(
    resource: string,
    code: string = 'ERR_NOT_FOUND',
    description: string = 'Resource not found.'
  ) {
    super(
      `Resource '${resource}' not found.`,
      HttpStatus.NOT_FOUND,
      code,
      description
    );
  }
}

export class RateLimitError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_RATE_LIMIT',
    description: string = 'Rate limit exceeded.'
  ) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, code, description);
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string,
    code: string = 'ERR_DATABASE',
    description: string = 'Database error.'
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code, description);
  }
}

export class ConflictError extends AppError {
  constructor(
    message: string,
    code: string = 'CONFLICT',
    description: string = 'Conflict Error.'
  ) {
    super(message, HttpStatus.CONFLICT, code, description);
  }
}
