import 'package:flutter/material.dart';
import 'package:flutter_client/models/order_product.dart';

class OrderDetailsProductCart extends StatelessWidget {
  const OrderDetailsProductCart({required this.orderProduct, super.key});
  final OrderProduct orderProduct;

  @override
  Widget build(BuildContext context) {
    return Card(
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
                      orderProduct.title,
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const Spacer(),
                    Text(
                      "LKR ${orderProduct.price.toStringAsFixed(2)}",
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                Text(
                  'Quantity',
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                ),
                Text(
                  orderProduct.quantity.toString(),
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 12,
                        fontWeight: FontWeight.normal,
                      ),
                ),
              ],
            )),
      ),
    );
  }
}
