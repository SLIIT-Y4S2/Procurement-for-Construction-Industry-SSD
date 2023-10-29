import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/models/goods_receipt.dart';
import 'package:flutter_client/screens/delivery_confirmation.dart';
import 'package:intl/intl.dart';

class OrderButtonProperties {
  final Color color;
  final String text;

  OrderButtonProperties(this.color, this.text);
}

//TODO changes this
OrderButtonProperties getButtonProperties(String state) {
  switch (state) {
    case 'Completed':
      return OrderButtonProperties(
          kApprovedAndOrderCompletedColor, 'Completed');
    // case 'Pending':
    //   return OrderButtonProperties(partialyDelivered, 'Pending');
    // case 'placed':
    //   return OrderButtonProperties(placed, 'Placed');
    // case 'partially delivered':
    //   return OrderButtonProperties(partialyDelivered, 'Partially delivered');
    default:
      return OrderButtonProperties(kDeclined, 'Not completed');
  }
}

class DeliveryAdviceCard extends StatelessWidget {
  final GoodsReceipt goodsReceipt;
  DeliveryAdviceCard({super.key, required this.goodsReceipt});

  final buttonProperties = getButtonProperties('Completed');

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => const DeliveryConfirm(),
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
                      goodsReceipt.goodsReceiptId,
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const Spacer(),
                    Text(
                      //display date,
                      DateFormat('yyyy-MM-dd – kk:mm')
                          .format(goodsReceipt.createdAt),
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                Text(
                  'Supplier name',
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                ),

                // button -------------------->>>>>>>>>>
                Row(
                  children: [
                    Text(
                      'Rs.25.000',
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
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
    );
  }
}
