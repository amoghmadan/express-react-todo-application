export class APIError extends Error {
  public status = 500;
  public message = "Internal Server Error";

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }

  statusCode(): number {
    return this.status;
  }
}

export class BadRequestError extends APIError {
  public status = 400;
  public message = "Bad Request";
}

export class UnauthorizedError extends APIError {
  public status = 401;
  public message = "Unauthorized";
}

export class ForbiddenError extends APIError {
  public status = 403;
  public message = "Forbidden";
}

export class NotFoundError extends APIError {
  public status = 404;
  public message = "Not Found";
}

export class MethodNotAllowedError extends APIError {
  public status = 405;
  public message = "Method Not Allowed";
}

export class NotImplementedError extends APIError {
  public status = 501;
  public message = "Not Implemented";
}
