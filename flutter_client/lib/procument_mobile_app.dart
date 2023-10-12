import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/screens/home_screen.dart';
import 'package:flutter_client/screens/login_screen.dart';
import 'package:google_fonts/google_fonts.dart';

class ProcumentMobileApp extends StatefulWidget {
  const ProcumentMobileApp({super.key});

  @override
  State<ProcumentMobileApp> createState() => _ProcumentMobileAppState();
}

class _ProcumentMobileAppState extends State<ProcumentMobileApp> {
  late AuthBloc _authbloc;
  // MaterialApp
  @override
  void initState() {
    super.initState();
    _authbloc = AuthBloc();
  }

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider(
          create: (context) => _authbloc,
        ),
      ],
      child: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthInitial) {
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(
                builder: (context) => const LoginScreen(),
              ),
            );
          }

          if (state is SignedIn) {
            print('sdsd');
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(
                builder: (context) => const HomeScreen(),
              ),
            );
          }
        },
        child: MaterialApp(
          title: 'Procument Mobile App',
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: kSeedColor,
              primary: kPrimaryColor,
            ),
            textTheme: GoogleFonts.interTextTheme(),
            useMaterial3: true,
          ),
          home: const LoginScreen(),
        ),
      ),
    );
  }
}
