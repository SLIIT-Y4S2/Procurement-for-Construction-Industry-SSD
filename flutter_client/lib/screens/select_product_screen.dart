import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/widgets/supplier_products_card.dart';

class SelectProductScreen extends StatelessWidget {
  const SelectProductScreen({required this.product, super.key});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
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
              if (product.isAvailable == true)
                ListView.separated(
                  shrinkWrap: true,
                  padding: const EdgeInsets.all(8.0),
                  separatorBuilder: (context, index) => const SizedBox(
                    height: 8.0,
                  ),
                  itemCount: 5,
                  itemBuilder: (BuildContext context, int index) =>
                      SupplierProductsCard(
                    product: product,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
