export class InvalidTokenError extends Error {
  public message = "Invalid token!";
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}
