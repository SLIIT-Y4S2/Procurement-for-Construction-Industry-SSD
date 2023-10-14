import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';

class SupplierProductsCard extends StatelessWidget {
  const SupplierProductsCard({required this.product, super.key});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        contentPadding: EdgeInsets.all(8),
        title: Text(product.title),
        subtitle: Text(product.description),
        trailing: Column(
          children: [
            Text('${product.price}'),
            Container(
              padding: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: product.isAvailable == true
                    ? Color(0xFFDEFFD9)
                    : Color(0XFFFFD9D9),
                borderRadius: BorderRadius.circular(48.0),
              ),
              child: Text(
                  product.isAvailable == true ? 'In Stock' : 'Out of stock'),
            ),
          ],
        ),
      ),
    );
  }
}
