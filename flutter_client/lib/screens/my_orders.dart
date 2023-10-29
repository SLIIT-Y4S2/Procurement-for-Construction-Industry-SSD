import 'package:flutter_client/constants.dart';
import 'package:flutter/material.dart';

class OrderButtonProperties {
  final Color color;
  final String text;

  OrderButtonProperties(this.color, this.text);
}

class MyOrders extends StatelessWidget {
  const MyOrders({super.key});

  final String orderState = 'placed';

  OrderButtonProperties getButtonProperties(String state) {
    switch (state) {
      case 'pending':
        return OrderButtonProperties(viewPending, 'Pending');
      case 'approved':
        return OrderButtonProperties(approvedAndOrderCompleted, 'Approved');
      case 'declined':
        return OrderButtonProperties(declined, 'Declined');
      case 'placed':
        return OrderButtonProperties(placed, 'Placed');
      case 'partially delivered':
        return OrderButtonProperties(partialyDelivered, 'Partially delivered');
      default:
        return OrderButtonProperties(approvedAndOrderCompleted, 'Completed');
    }
  }

  @override
  Widget build(BuildContext context) {
    final buttonProperties = getButtonProperties(orderState);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My orders'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Card(
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.zero),
                ),
                elevation: 8,
                child: Container(
                  width: double.infinity,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Create order',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                  ),
                            ),
                            Spacer(),
                            Text(
                              'Date',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        Text(
                              'Supplier name',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                            ),
                        Row(
                          children: [
                            Text(
                              'Rs.25.000',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.normal,
                                  ),
                            ),
                            Spacer(),
                            Container(
                              decoration: BoxDecoration(
                                color: buttonProperties.color,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: TextButton(
                                onPressed: null,
                                child: Text(
                                  buttonProperties.text,
                                  style: TextStyle(color: Colors.white),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}