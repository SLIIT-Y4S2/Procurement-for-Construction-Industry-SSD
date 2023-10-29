import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/blocs/goodReceipts/goods_receipt_bloc.dart';
import 'package:flutter_client/blocs/order/order_bloc.dart';
import 'package:flutter_client/blocs/products/products_bloc.dart';
import 'package:flutter_client/blocs/site/site_bloc.dart';
import 'package:flutter_client/procument_mobile_app.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

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
      RepositoryProvider(
        create: (context) => CartBloc(),
      ),
      RepositoryProvider(
        create: (context) => SiteBloc(),
      ),
      RepositoryProvider(
        create: (context) => OrderBloc(),
      ),
      RepositoryProvider(
        create: (contest) => GoodsReceiptBloc(),
      )
    ],
    child: const ProcumentMobileApp(),
  ));
}
