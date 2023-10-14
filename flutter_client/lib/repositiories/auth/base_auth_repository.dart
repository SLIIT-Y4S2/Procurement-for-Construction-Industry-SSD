abstract class BaseAuthRepository {
  Future<bool> login(String email, String password);
  Future<void> logout();
}
