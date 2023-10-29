import 'package:flutter/material.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/models/goods_receipt.dart';
import 'package:flutter_client/screens/delivery_confirmation_screen.dart';
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
            builder: (context) => DeliveryConfirm(
              goodsReceipt: goodsReceipt,
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
                  'Supplier: ',
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.normal,
                      ),
                ),
                Text(
                  goodsReceipt.supplier.name,
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                ),

                // button -------------------->>>>>>>>>>
                Row(
                  children: [
                    Text(
                      'Site: ',
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.normal,
                          ),
                    ),
                    Text(
                      goodsReceipt.site.name,
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const Spacer(),
                    _statusDisplay(context, goodsReceipt.status),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Container _statusDisplay(context, GoodsReceiptStatus status) {
    switch (status) {
      case GoodsReceiptStatus.pendingShipping:
        return Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5),
            color: kViewPendingColor.withOpacity(0.9),
          ),
          padding: const EdgeInsets.all(8),
          child: Text(
            'Pending Confirmation',
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
          ),
        );
      case GoodsReceiptStatus.received:
        return Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5),
            color: kApprovedAndOrderCompletedColor.withOpacity(0.2),
          ),
          padding: const EdgeInsets.all(8),
          child: Text(
            'Received',
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
          ),
        );
      default:
        return Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5),
            color: kViewPendingColor,
          ),
          child: Text(
            'Error',
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: kDeclined,
                ),
          ),
        );
    }
  }
}
