import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/blocs/products/products_bloc.dart';
import 'package:flutter_client/procument_mobile_app.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';

void main() {
  runApp(MultiRepositoryProvider(
    providers: [
      RepositoryProvider(
        create: (context) => AuthBloc(),
      ),
      RepositoryProvider(
        create: (context) => AuthRepository(),
      ),
      RepositoryProvider(
        create: (context) => ProductsBloc(),
      ),
    ],
    child: const ProcumentMobileApp(),
  ));
}
