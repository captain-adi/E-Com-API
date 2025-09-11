class ApiResponse {
  constructor(success, message, statusCode, data) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode < 400;
    this.data = data;
  }
}

export default ApiResponse;
