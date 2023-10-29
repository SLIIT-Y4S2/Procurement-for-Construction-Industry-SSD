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
        return OrderButtonProperties(kViewPendingColor, 'Pending');
      case 'approved':
        return OrderButtonProperties(
            kApprovedAndOrderCompletedColor, 'Approved');
      case 'declined':
        return OrderButtonProperties(kDeclined, 'Declined');
      case 'placed':
        return OrderButtonProperties(kPlaced, 'Placed');
      case 'partially delivered':
        return OrderButtonProperties(
            kPartiallyDelivered, 'Partially delivered');
      default:
        return OrderButtonProperties(
            kApprovedAndOrderCompletedColor, 'Completed');
    }
  }

  @override
  Widget build(BuildContext context) {
    final buttonProperties = getButtonProperties(orderState);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'My orders',
          style: Theme.of(context).textTheme.titleLarge!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
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
                child: SizedBox(
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
                            const Spacer(),
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
                        const SizedBox(height: 20),
                        Text(
                          'Supplier name',
                          style:
                              Theme.of(context).textTheme.bodyMedium!.copyWith(
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
                            const Spacer(),
                            Container(
                              decoration: BoxDecoration(
                                color: buttonProperties.color,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: TextButton(
                                onPressed: null,
                                child: Text(
                                  buttonProperties.text,
                                  style: const TextStyle(color: Colors.white),
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
