import 'package:flutter/material.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/widgets/loginFormField.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
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
                  style: Theme.of(context).textTheme.headlineLarge!.copyWith(
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
                Image.asset('assets/images/site_eng.jpg'),
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
                            isPasswordField: false,
                            controller: _usernameController),
                        const SizedBox(height: 16),
                        LoginFormField(
                            isPasswordField: true,
                            controller: _passwordController),
                        const SizedBox(height: 16),
                        ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                              backgroundColor:
                                  Theme.of(context).colorScheme.primary,
                            ),
                            child: Text(kLoginBtnText,
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Theme.of(context)
                                          .colorScheme
                                          .onPrimary,
                                    ))),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
