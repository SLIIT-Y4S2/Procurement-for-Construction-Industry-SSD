import 'package:bloc/bloc.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<LoginEvent>(_loginEventHandeler);
    on<SignOut>(_logoutEventHandeler);
  }
}

void _loginEventHandeler(LoginEvent event, Emitter<AuthState> emit) async {
  emit(SigningIn());
  AuthRepository authRepository = AuthRepository();
  final isLoggedIn = await authRepository.login(event.username, event.password);
  if (isLoggedIn) {
    emit(SignedIn());
  } else {
    emit(SignInFailed());
  }
}

void _logoutEventHandeler(SignOut event, Emitter<AuthState> emit) async {
  emit(SigningOut());
  AuthRepository authRepository = AuthRepository();
  final isLoggedOut = await authRepository.logout();
  if (isLoggedOut) {
    // authRepository.isTokenAvailable();
    emit(SignedOut());
  } else {
    emit(SignOutFailed());
  }
}
