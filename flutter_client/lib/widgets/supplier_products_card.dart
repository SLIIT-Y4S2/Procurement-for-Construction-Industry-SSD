import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/models/product_model.dart';

class SupplierProductsCard extends StatelessWidget {
  const SupplierProductsCard({required this.product, super.key});
  final Product product;
  @override
  Widget build(BuildContext context) {
    void onTapHandler() {
      BlocProvider.of<CartBloc>(context).add(
        AddProdctToCartEvent(product: product),
      );

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('${product.title} added to cart'),
        ),
      );

      Navigator.of(context).pop();
    }

    return InkWell(
      onTap: onTapHandler,
      child: Card(
        surfaceTintColor: Colors.white,
        elevation: 5,
        child: ListTile(
          contentPadding: const EdgeInsets.all(8),
          title: Text(product.title),
          subtitle: Text(product.description),
          trailing: Column(
            children: [
              Text('LKR ${product.price.toStringAsFixed(2)}'),
            ],
          ),
        ),
      ),
    );
  }
}
