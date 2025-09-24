class ApiResponse {
  constructor(success, message, statusCode, data) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
