import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/screens/supplier_products_screen.dart';

class SupplierDetailsCard extends StatelessWidget {
  const SupplierDetailsCard({required this.product, super.key});
  final Product product;

  @override
  Widget build(BuildContext context) {
    void ontapHandler() {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => SupplierProductsScreen(
            product: product,
          ),
        ),
      );
    }

    return Card(
      surfaceTintColor: Colors.white,
      elevation: 5,
      child: ListTile(
        selected: true,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        title: Text(
          '${product.userId}',
          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
        subtitle: Row(
          children: [
            Text('${product.title}'),
            const SizedBox(width: 8.0),
            Text('b'),
            const SizedBox(width: 8.0),
            Text('c'),
          ],
        ),
        trailing: const Text('Location',
            style: TextStyle(
              fontWeight: FontWeight.w900,
            )),
        onTap: ontapHandler,
      ),
    );
  }
}
