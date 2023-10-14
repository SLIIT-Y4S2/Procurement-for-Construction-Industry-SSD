import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';

class SupplierProductsCard extends StatelessWidget {
  const SupplierProductsCard({required this.product, super.key});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Card(
      surfaceTintColor: Colors.white,
      elevation: 5,
      child: ListTile(
        contentPadding: EdgeInsets.all(8),
        title: Text(product.title),
        subtitle: Text(product.description),
        trailing: Column(
          children: [
            Text('${product.price}'),
          ],
        ),
      ),
    );
  }
}
