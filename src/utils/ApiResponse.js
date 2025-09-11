class ApiResponse {
  constructor(success, message, data, statusCode) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode < 400;
  }
}

export default ApiResponse;
