import 'dart:developer' as developer;

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/models/order_product.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/screens/delivery_details_screen.dart';
import 'package:flutter_client/screens/select_product_screen.dart';
import 'package:flutter_client/widgets/selected_product_card.dart';

class SelectedProductsScreen extends StatefulWidget {
  const SelectedProductsScreen({required this.supplier, super.key});

  final User supplier;

  @override
  State<SelectedProductsScreen> createState() => _SupplierProductsScreenState();
}

class _SupplierProductsScreenState extends State<SelectedProductsScreen> {
  List<OrderProduct> _cart = [];
  double _cartTotal = 0;
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
            _cart = state.orderProducts;
          });
          _cartTotal = state.cartTotal;
          developer.log(_cartTotal.toString(),
              name: 'selected_products_screen');
        }

        if (state is RestoreProductToProductList) {
          setState(() {
            if (!widget.supplier.products.contains(state.product)) {
              widget.supplier.products.add(state.product);
            }
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
        body: Padding(
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
                    ConstrainedBox(
                      constraints: const BoxConstraints(
                        maxHeight: 480,
                      ),
                      child: ListView.separated(
                        shrinkWrap: true,
                        separatorBuilder: (context, index) => const SizedBox(
                          height: 16.0,
                        ),
                        itemCount: _cart.length,
                        itemBuilder: (context, index) =>
                            SelectedProductCard(orderProduct: _cart[index]),
                      ),
                    )
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
                ),
              ),
              const SizedBox(height: 16.0),
              const Spacer(),
              if (_cart.isNotEmpty)
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    backgroundColor: Theme.of(context).colorScheme.primary,
                  ),
                  onPressed: () {
                    if (_cartTotal > 0) {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => const DeliveryDetailsScreen(),
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Please add products to the cart.'),
                        ),
                      );
                    }
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Total: LKR ${_cartTotal.toStringAsFixed(2)}',
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                              color: Colors.white,
                            ),
                      ),
                      const Spacer(),
                      Text(
                        'Next',
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                              color: Colors.white,
                            ),
                      ),
                      const Icon(
                        Icons.chevron_right,
                        color: Colors.white,
                      )
                    ],
                  ),
                ),
              const SizedBox(height: 56.0),
            ],
          ),
        ),
      ),
    );
  }
}
