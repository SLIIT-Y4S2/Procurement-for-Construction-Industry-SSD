class AuthException implements Exception {
  final String message;

  AuthException(this.message);
}

class InvalidCredentialsException extends AuthException {
  InvalidCredentialsException(String message) : super(message);
}

class UnauthorizedException extends AuthException {
  UnauthorizedException(String message) : super(message);
}

class TokenExpiredException extends AuthException {
  TokenExpiredException(String message) : super(message);
}
