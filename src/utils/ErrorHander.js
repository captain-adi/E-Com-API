class ErrorHandler extends Error {
  constructor(message, statusCode) {
    (this.message = message), 
    (this.statusCode = statusCode),
    (this.success = false);
  }
}


export default ErrorHandler;