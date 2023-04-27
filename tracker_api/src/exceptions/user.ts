export class PasswordDoNotMatchError extends Error {
  public message = "Both the passwords should match!";
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
