part of 'auth_bloc.dart';

@immutable
abstract class AuthEvent {
  const AuthEvent();
}

class GetSiteManagerName extends AuthEvent {
  const GetSiteManagerName();
}

class LoginEvent extends AuthEvent {
  final String username;
  final String password;

  const LoginEvent({
    required this.username,
    required this.password,
  });
}

class SignOut extends AuthEvent {
  const SignOut();
}
