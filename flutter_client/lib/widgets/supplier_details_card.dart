import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';

class SupplierDetailsCard extends StatelessWidget {
  const SupplierDetailsCard({required this.product, super.key});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 8.0,
      ),
      child: ListTile(
        selected: true,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
            side: BorderSide(
              color: Theme.of(context).colorScheme.primary,
            )),
        title: Text(
          'Siripala Suppliers',
          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
        subtitle: Row(
          children: [
            Text('a'),
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
        onTap: () => {},
      ),
    );
  }
}
