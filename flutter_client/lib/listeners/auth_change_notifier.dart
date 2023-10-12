import 'dart:async';

import 'package:flutter/material.dart';

class AuthChangeNotifier {
  bool _isLoggedIn = false;
  bool get isLoggedIn => _isLoggedIn;

  final StreamController<bool> _isAuthenticatedController =
      StreamController<bool>();
  StreamSink<bool> get _isAuthenticatedSink => _isAuthenticatedController.sink;
  Stream<bool> get isAuthenticatedStream => _isAuthenticatedController.stream;

  void login() {
    print('login notifier');
    _isLoggedIn = true;
    _isAuthenticatedSink.add(_isLoggedIn);
  }

  void logout() {
    _isLoggedIn = false;
    _isAuthenticatedSink.add(_isLoggedIn);
  }
}
