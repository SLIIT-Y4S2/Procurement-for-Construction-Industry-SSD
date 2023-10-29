import 'package:flutter/material.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/screens/my_order_details.dart';

class OrderButtonProperties {
  final Color color;
  final String text;

  OrderButtonProperties(this.color, this.text);
}

class MyOrdersCard extends StatelessWidget {
  const MyOrdersCard({required this.order, super.key});
  final Order order;
  @override
  Widget build(BuildContext context) {
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

    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => MyOrderDetails(
              order: order,
            ),
          ),
        );
      },
      child: Card(
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
                      order.orderId!,
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const Spacer(),
                    Text(
                      order.dateToBeDelivered.toString().split(' ')[0],
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                Text(
                  order.supplierId,
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                ),
                Row(
                  children: [
                    Text(
                      'LKR ${order.total!.toStringAsFixed(2)}',
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.normal,
                          ),
                    ),
                    const Spacer(),
                    Container(
                      decoration: BoxDecoration(
                        color: getButtonProperties(order.status!).color,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: TextButton(
                        onPressed: null,
                        child: Text(
                          getButtonProperties(order.status!).text,
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
    );
  }
}
