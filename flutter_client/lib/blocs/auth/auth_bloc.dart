import 'package:bloc/bloc.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<GetSiteManagerName>(_getSiteManagerNameEventHandeler);
    on<LoginEvent>(_loginEventHandeler);
    on<SignOut>(_logoutEventHandeler);
  }
}

void _getSiteManagerNameEventHandeler(
    GetSiteManagerName event, Emitter<AuthState> emit) async {
  emit(SigningIn());
  AuthRepository authRepository = AuthRepository();
  emit(SiteManagerNameLoading());
  await authRepository.siteManagerName.then((siteManagerName) {
    emit(SiteManagerName(siteManagerName));
  }).catchError((onError) {
    emit(SiteManagerNameLoadFailed());
  });
}

void _loginEventHandeler(LoginEvent event, Emitter<AuthState> emit) async {
  emit(SigningIn());
  AuthRepository authRepository = AuthRepository();

  await authRepository.login(event.username, event.password).then((isLoggedIn) {
    if (isLoggedIn) {
      emit(SignedIn());
    } else {
      emit(SignInFailed());
    }
  }).catchError((onError) {
    emit(SignInFailed());
  });
}

void _logoutEventHandeler(SignOut event, Emitter<AuthState> emit) async {
  emit(SigningOut());
  AuthRepository authRepository = AuthRepository();
  final isLoggedOut = await authRepository.logout();
  if (isLoggedOut) {
    emit(SignedOut());
    emit(AuthInitial());
  } else {
    emit(SignOutFailed());
  }
}
