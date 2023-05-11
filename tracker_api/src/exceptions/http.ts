import { STATUS_CODES } from "http";

export class APIError extends Error {
  public status = 500;

  constructor(message = "Internal Server Error") {
    super(message);
    this.message = STATUS_CODES[this.status] || message;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends APIError {
  public status = 400;
}

export class UnauthorizedError extends APIError {
  public status = 401;
}

export class ForbiddenError extends APIError {
  public status = 403;
}

export class NotFoundError extends APIError {
  public status = 404;
}

export class MethodNotAllowedError extends APIError {
  public status = 405;
}

export class NotImplementedError extends APIError {
  public status = 501;
}
