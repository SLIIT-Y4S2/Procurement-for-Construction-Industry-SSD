import 'package:flutter/material.dart';
import 'package:flutter_client/widgets/supplier_details_card.dart';

//Todo
import 'package:flutter_client/dummy_data/dummy_productsd.dart';

class CreateRequisitionOrder extends StatelessWidget {
  const CreateRequisitionOrder({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back_ios),
        title: Text(
          'Create Requisition Order',
          style: Theme.of(context).textTheme.titleMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
      ),
      body: SingleChildScrollView(
          child: Padding(
        padding: const EdgeInsets.all(8.0),
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
            ListView.builder(
              shrinkWrap: true,
              itemBuilder: (context, index) =>
                  SupplierDetailsCard(product: dummyProducts[index]),
              itemCount: 5,
            )
          ],
        ),
      )),
    );
  }
}
