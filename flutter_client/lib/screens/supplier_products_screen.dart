import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/screens/select_product_screen.dart';
import 'package:flutter_client/widgets/selected_product_card.dart';

class SupplierProductsScreen extends StatefulWidget {
  const SupplierProductsScreen({required this.supplier, super.key});

  final User supplier;

  @override
  State<SupplierProductsScreen> createState() => _SupplierProductsScreenState();
}

class _SupplierProductsScreenState extends State<SupplierProductsScreen> {
  List<Product> _cart = [];
  @override
  void initState() {
    super.initState();
    BlocProvider.of<CartBloc>(context).add(
      const LoadCartEvent(),
    );
  }

  @override
  Widget build(BuildContext context) {
    void ontapHandler() {
      Navigator.of(context).push(
        MaterialPageRoute(
          maintainState: false,
          builder: (context) => SelectProductScreen(
            supplier: widget.supplier,
          ),
        ),
      );
    }

    return BlocListener<CartBloc, CartState>(
      listener: (context, state) {
        if (state is ProductCartUpdated) {
          setState(() {
            _cart = state.products;
          });
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Products',
            style: Theme.of(context).textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w900,
                ),
          ),
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 24.0,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.supplier.name,
                  style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                ),
                Text(
                  widget.supplier.email,
                  style: Theme.of(context).textTheme.titleSmall!.copyWith(
                        fontWeight: FontWeight.w400,
                      ),
                ),
                const SizedBox(height: 16.0),
                Column(
                  children: [
                    if (_cart.isEmpty)
                      Text(
                        'No products added yet.',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    if (_cart.isNotEmpty)
                      for (var product in _cart)
                        SelectedProductCard(product: product),
                  ],
                ),
                const SizedBox(height: 16.0),
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
                          style:
                              Theme.of(context).textTheme.bodyMedium!.copyWith(
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
      ),
    );
  }
}
