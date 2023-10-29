import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/widgets/supplier_products_card.dart';

class SelectProductScreen extends StatefulWidget {
  const SelectProductScreen({required this.supplier, super.key});
  final User supplier;

  @override
  State<SelectProductScreen> createState() => _SelectProductScreenState();
}

class _SelectProductScreenState extends State<SelectProductScreen> {
  late List<Product> _products;
  @override
  void initState() {
    _products = widget.supplier.products;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<CartBloc, CartState>(
      listener: (context, state) {
        if (state is RemoveProductTemporarilyFromProductList) {
          setState(() {
            _products.removeAt(state.productIndex);
          });
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Select Product',
            style: Theme.of(context).textTheme.titleLarge!.copyWith(
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
              children: [
                if (_products.isNotEmpty)
                  ListView.separated(
                    shrinkWrap: true,
                    padding: const EdgeInsets.all(8.0),
                    separatorBuilder: (context, index) => const SizedBox(
                      height: 8.0,
                    ),
                    itemCount: _products.length,
                    itemBuilder: (BuildContext context, int index) =>
                        SupplierProductsCard(
                      index: index,
                      product: _products[index],
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
