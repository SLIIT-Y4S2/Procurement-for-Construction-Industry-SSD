import 'package:flutter/material.dart';
import 'package:flutter_client/constants.dart';

class LoginFormField extends StatefulWidget {
  const LoginFormField({
    super.key,
    required this.isPasswordField,
    required this.controller,
    required this.onSaved,
  });
  final bool isPasswordField;
  final TextEditingController controller;
  final String? Function(String?) onSaved;

  @override
  State<LoginFormField> createState() => _LoginFormFieldState();
}

class _LoginFormFieldState extends State<LoginFormField> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(!widget.isPasswordField
            ? kLoginFormUsernameLabel
            : kLoginFormPasswordLabel),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 8),
          decoration: BoxDecoration(
            border: Border.all(
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: TextFormField(
            controller: widget.controller,
            validator: widget.onSaved,
            obscureText: widget.isPasswordField,
            decoration: const InputDecoration(
              border: InputBorder.none,
            ),
          ),
        ),
      ],
    );
  }
}
