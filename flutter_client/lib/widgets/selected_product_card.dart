import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';

class SelectedProductCard extends StatelessWidget {
  const SelectedProductCard({
    required this.product,
    super.key,
  });
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(
          product.title,
          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
        subtitle: Text(
          product.description,
          style: Theme.of(context).textTheme.bodySmall!.copyWith(
                fontWeight: FontWeight.w400,
              ),
        ),
        trailing: Text(
          'LKR ${product.price.toStringAsFixed(2)}',
          style: Theme.of(context).textTheme.bodySmall!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
      ),
    );
  }
}
