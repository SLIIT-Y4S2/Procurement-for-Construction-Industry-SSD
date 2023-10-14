import 'package:flutter/material.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/screens/select_product_screen.dart';

class SupplierProductsScreen extends StatelessWidget {
  const SupplierProductsScreen({required this.product, super.key});

  final Product product;

  @override
  Widget build(BuildContext context) {
    void ontapHandler() {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => SelectProductScreen(
            product: product,
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(
          '${product.title}',
          style: Theme.of(context).textTheme.titleMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${product.userId} Suppier name goes here ',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
              ),
              Text(
                'Product ${product.description}',
                style: Theme.of(context).textTheme.titleSmall!.copyWith(
                      fontWeight: FontWeight.w400,
                    ),
              ),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    backgroundColor: Theme.of(context).colorScheme.primary,
                  ),
                  onPressed: ontapHandler,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Add Product',
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                              color: Colors.white,
                            ),
                      ),
                      const SizedBox(width: 16.0),
                      const Icon(
                        Icons.add,
                        color: Colors.white,
                      ),
                    ],
                  )),
            ],
          ),
        ),
      ),
    );
  }
}
