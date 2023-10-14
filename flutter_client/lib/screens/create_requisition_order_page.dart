import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/products/products_bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/widgets/supplier_details_card.dart';

class CreateRequisitionOrder extends StatefulWidget {
  const CreateRequisitionOrder({super.key});

  @override
  State<CreateRequisitionOrder> createState() => _CreateRequisitionOrderState();
}

class _CreateRequisitionOrderState extends State<CreateRequisitionOrder> {
  late List<Product> products;

  @override
  void initState() {
    super.initState();
    context.read<ProductsBloc>().add(const GetProductsEvent());
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProductsBloc, ProductsState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            // leading: const Icon(Icons.arrow_back_ios),
            title: Text(
              'Create Requisition Order',
              style: Theme.of(context).textTheme.titleMedium!.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
            ),
          ),
          body: SingleChildScrollView(
              child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                Card(
                  clipBehavior: Clip.hardEdge,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      vertical: 8.0,
                      horizontal: 24.0,
                    ),
                    child: Text(
                      'Each order has only one supplier. If the selected supplier does not have all the products you need, please create another order.',
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 16.0,
                ),
                const SearchBar(
                  padding: MaterialStatePropertyAll<EdgeInsets>(
                      EdgeInsets.symmetric(horizontal: 16.0)),
                  leading: Icon(Icons.search),
                  shape: MaterialStatePropertyAll<OutlinedBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(8),
                      ),
                    ),
                  ),
                  backgroundColor: MaterialStatePropertyAll<Color>(
                    Colors.white,
                  ),
                  surfaceTintColor: MaterialStatePropertyAll<Color>(
                    Colors.white,
                  ),
                ),
                const SizedBox(height: 16.0),
                if (state is ProductsLoading) const CircularProgressIndicator(),
                if (state is ProductsLoaded)
                  state.products.isNotEmpty
                      ? ListView.separated(
                          shrinkWrap: true,
                          itemBuilder: (context, index) => SupplierDetailsCard(
                              product: state.products[index]),
                          separatorBuilder: (context, index) => const SizedBox(
                            height: 8.0,
                          ),
                          itemCount: 5,
                        )
                      : const Text('No Products Found'),
              ],
            ),
          )),
        );
      },
    );
  }
}
