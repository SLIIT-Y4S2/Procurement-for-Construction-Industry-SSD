import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<LoginEvent>(_loginEventHandeler);
  }
}

void _loginEventHandeler(LoginEvent event, Emitter<AuthState> emit) {
  emit(SigningIn());
}
