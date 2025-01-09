export default class CustomError extends Error {
    status: number = 500;
    constructor(message: string, status: number) {
      super(message); // Call the parent class constructor with the message
      this.status = status;
      this.name = "CustomError"; // Custom error name
    }
  }