import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/screens/home_screen.dart';
import 'package:flutter_client/widgets/loginFormField.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late TextEditingController _usernameController;
  late TextEditingController _passwordController;
  late AuthBloc _authenticationBloc;

  void _submitHandeler() {
    _formKey.currentState!.save();

    // Validate returns true if the form is valid, or false otherwise.
    final isValid = _formKey.currentState!.validate();
    print('here ::=> $isValid');
    if (isValid) {
      _authenticationBloc.add(
        LoginEvent(
            username: _usernameController.text,
            password: _passwordController.text),
      );
    }
  }

  String? _validateUsername(String? value) {
    if (value == null || value.isEmpty) {
      return 'Username is required';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Password is required';
    }

    return null;
  }

  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController();
    _passwordController = TextEditingController();
    _authenticationBloc = BlocProvider.of<AuthBloc>(context);
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return Scaffold(
            appBar: PreferredSize(
              preferredSize: const Size.fromHeight(200),
              child: AppBar(
                iconTheme: Theme.of(context).iconTheme.copyWith(
                      color: Colors.white,
                    ),
                backgroundColor: Theme.of(context).colorScheme.primary,
                flexibleSpace: Container(
                    alignment: Alignment.center,
                    height: double.infinity,
                    decoration: const BoxDecoration(),
                    child: Text(
                      kLoginScreenTitle,
                      style:
                          Theme.of(context).textTheme.headlineLarge!.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w900,
                              ),
                    )),
              ),
            ),
            body: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Image.asset(
                      kLoginScreenImagePath,
                      height: 250,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 16,
                      ),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            LoginFormField(
                                onSaved: _validateUsername,
                                isPasswordField: false,
                                controller: _usernameController),
                            const SizedBox(height: 16),
                            LoginFormField(
                                onSaved: _validatePassword,
                                isPasswordField: true,
                                controller: _passwordController),
                            const SizedBox(height: 16),
                            if (state is SigningIn)
                              const CircularProgressIndicator(),
                            if (state is AuthInitial)
                              ElevatedButton(
                                onPressed: _submitHandeler,
                                style: ElevatedButton.styleFrom(
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  backgroundColor:
                                      Theme.of(context).colorScheme.primary,
                                ),
                                child: Text(
                                  kLoginBtnText,
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleLarge!
                                      .copyWith(
                                        color: Theme.of(context)
                                            .colorScheme
                                            .onPrimary,
                                      ),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ));
      },
    );
  }
}
