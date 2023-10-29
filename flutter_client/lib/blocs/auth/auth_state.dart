part of 'auth_bloc.dart';

@immutable
sealed class AuthState {}

final class AuthInitial extends AuthState {}

final class SigningIn extends AuthState {}

final class SignedIn extends AuthState {}

final class SignInFailed extends AuthState {}

final class SigningOut extends AuthState {}

final class SignedOut extends AuthState {}

final class SignOutFailed extends AuthState {}

final class SiteManagerName extends AuthState {
  final String siteManagerName;

  SiteManagerName(this.siteManagerName);
}

final class SiteManagerNameLoading extends AuthState {}

final class SiteManagerNameLoadFailed extends AuthState {}
