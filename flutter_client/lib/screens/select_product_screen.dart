import 'package:flutter/material.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/widgets/supplier_products_card.dart';

class SelectProductScreen extends StatelessWidget {
  const SelectProductScreen({required this.supplier, super.key});
  final User supplier;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Select Product',
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 24.0,
          ),
          child: Column(
            children: [
              if (supplier.products.isNotEmpty)
                ListView.separated(
                  shrinkWrap: true,
                  padding: const EdgeInsets.all(8.0),
                  separatorBuilder: (context, index) => const SizedBox(
                    height: 8.0,
                  ),
                  itemCount: supplier.products.length,
                  itemBuilder: (BuildContext context, int index) =>
                      SupplierProductsCard(
                    product: supplier.products[index],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
