class BaseError extends Error {
  constructor(message = "Unknown error") {
    super(message);
    this._code = 500;
    this._status = "fail";
    this._data = "Internal Server Error";
  }
}

class RouteNotFoundError extends BaseError {
  constructor() {
    super(`Route not found`);
    this._code = 404;
    this._status = "error";
    this._data = "Not found";
  }
}

module.exports = {
  BaseError,
  RouteNotFoundError,
};
