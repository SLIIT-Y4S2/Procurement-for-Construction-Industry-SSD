import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';
import 'package:flutter_client/screens/home_screen.dart';
import 'package:flutter_client/screens/login_screen.dart';
import 'package:google_fonts/google_fonts.dart';

class ProcumentMobileApp extends StatefulWidget {
  const ProcumentMobileApp({super.key});

  @override
  State<ProcumentMobileApp> createState() => _ProcumentMobileAppState();
}

class _ProcumentMobileAppState extends State<ProcumentMobileApp> {
  final GlobalKey<NavigatorState> _rootNavigatorKey =
      GlobalKey<NavigatorState>();
  late AuthRepository _authRepository;
  bool _isTokenAvailable = false;

  // MaterialApp
  @override
  void initState() {
    super.initState();
    _authRepository = AuthRepository();
    _authRepository.isTokenAvailable().then((isTokenAvailable) {
      setState(() {
        if (isTokenAvailable != null) {
          _isTokenAvailable = isTokenAvailable;
        } else {
          _isTokenAvailable = false;
        }
      });
    }).catchError((error) {
      print(error);
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is SignedIn) {
          _rootNavigatorKey.currentState!.pushReplacement(
            MaterialPageRoute(
              builder: (context) => const HomeScreen(),
            ),
          );
        }
        if (state is AuthInitial) {
          _rootNavigatorKey.currentState!.pushReplacement(
            MaterialPageRoute(
              builder: (context) => const LoginScreen(),
            ),
          );
        }

        if (state is SigningIn) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Signing In'),
            ),
          );
        }

        if (state is SignedOut) {
          _rootNavigatorKey.currentState!.pushReplacement(
            MaterialPageRoute(
              builder: (context) => const LoginScreen(),
            ),
          );
        }
      },
      child: MaterialApp(
        navigatorKey: _rootNavigatorKey,
        title: 'Procument Mobile App',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: kSeedColor,
            primary: kPrimaryColor,
          ),
          textTheme: GoogleFonts.interTextTheme(),
          useMaterial3: true,
        ),
        home: _isTokenAvailable ? const HomeScreen() : const LoginScreen(),
      ),
    );
  }
}
