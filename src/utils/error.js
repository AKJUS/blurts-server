
class UserInputError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 400
  }
}

class UnauthorizedError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 403
  }
}

class NotFoundError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 404
  }
}
class MethodNotAllowedError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 405
  }
}

class RateLimitError extends Error {
  constructor (...params) {
    super(...params)
    this.statusCode = 429
  }
}

class PartialNotFoundError extends Error {
  constructor (partialName) {
    super(partialName)
    this.message = `Couldn’t find partial: '${partialName}'`
  }
}

export {
  UnauthorizedError,
  UserInputError,
  NotFoundError,
  MethodNotAllowedError,
  RateLimitError,
  PartialNotFoundError
}
