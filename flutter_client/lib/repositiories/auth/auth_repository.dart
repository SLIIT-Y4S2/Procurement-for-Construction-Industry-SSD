import 'dart:async';
import 'dart:convert';

import 'package:flutter_client/exceptions/auth_exceptions.dart';
import 'package:flutter_client/repositiories/auth/base_auth_repository.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

class AuthRepository extends BaseAuthRepository {
  @override
  Future<bool> login(String email, String password) async {
    final Uri authApiUri = Uri.http(
      '192.168.1.2:5000',
      'api/login',
    );

    // Request headers
    const requestHeaders = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    };

    // Request body
    var requestBody = jsonEncode({
      'email': email,
      'password': password,
    });

    // Make POST request to login api
    final response = await http.post(
      authApiUri,
      headers: requestHeaders,
      body: requestBody,
    );

    if (response.statusCode == 401) {
      throw InvalidCredentialsException('Failed to login');
    } else if (response.statusCode == 200) {
      final decodedResponse = jsonDecode(response.body);
      final acessToken = decodedResponse['accessToken'];

      try {
        // Verify a token (SecretKey for HMAC & PublicKey for all the others)
        final jwt = JWT.verify(acessToken, SecretKey('secret'));

        if (jwt.payload['role'] == 'procurementStaff') {
          const secureStorage = FlutterSecureStorage();
          AndroidOptions _getAndroidOptions() => const AndroidOptions(
                encryptedSharedPreferences: true,
              );
          await secureStorage.write(
            key: 'jwt',
            value: acessToken,
            aOptions: _getAndroidOptions(),
          );
          return true;
        } else {
          throw UnauthorizedException('Failed to login');
        }
      } on JWTExpiredException catch (e) {
        throw TokenExpiredException(e.message);
      } on JWTException catch (ex) {
        throw AuthException(ex.message); // ex: invalid signature
      }
    }

    return false;
  }

  @override
  Future<void> logout() async {
    const secureStorage = FlutterSecureStorage();
    var token = await secureStorage.read(key: 'jwt');
    await secureStorage.delete(key: 'jwt');
  }
}
