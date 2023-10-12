import 'package:bloc/bloc.dart';
import 'package:flutter_client/listeners/auth_change_notifier.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<LoginEvent>(_loginEventHandeler);
  }
}

void _loginEventHandeler(LoginEvent event, Emitter<AuthState> emit) async {
  emit(SigningIn());
  AuthRepository authRepository = AuthRepository();
  final isLoggedIn = await authRepository.login(event.username, event.password);
  print(isLoggedIn);
  if (isLoggedIn) {
    emit(SignedIn());
    print('emitted');
  } else {
    emit(SignInFailed());
  }
}
