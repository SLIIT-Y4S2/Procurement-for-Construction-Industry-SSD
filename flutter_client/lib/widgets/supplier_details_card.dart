import 'package:flutter/material.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/screens/supplier_products_screen.dart';

class SupplierDetailsCard extends StatelessWidget {
  const SupplierDetailsCard({required this.supplier, super.key});
  final User supplier;

  @override
  Widget build(BuildContext context) {
    void ontapHandler() {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => SupplierProductsScreen(
            supplier: supplier,
          ),
        ),
      );
    }

    return Card(
      surfaceTintColor: Colors.white,
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: ListTile(
          selected: true,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          title: Text(
            supplier.name,
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  fontWeight: FontWeight.w900,
                ),
          ),
          subtitle: supplier.products.isNotEmpty
              ? Column(
                  children: [
                    ...supplier.products.map(
                      (product) => Row(
                        children: [
                          Icon(Icons.circle,
                              size: 8.0, color: Colors.grey.shade500),
                          const SizedBox(width: 4.0),
                          Text(
                            product.title,
                            style:
                                Theme.of(context).textTheme.bodySmall!.copyWith(
                                      fontWeight: FontWeight.normal,
                                      color: Colors.black,
                                    ),
                          ),
                          const SizedBox(width: 16.0),
                        ],
                      ),
                    ),
                  ],
                )
              : null,
          trailing: Text(
            supplier.contactNumber,
            style: Theme.of(context).textTheme.bodySmall!.copyWith(
                  fontWeight: FontWeight.w900,
                ),
          ),
          onTap: ontapHandler,
        ),
      ),
    );
  }
}
