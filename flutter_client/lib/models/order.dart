import 'package:flutter_client/models/order_product.dart';

class Order {
  final String orderId;
  final DateTime dateToBeDelivered;
  final String siteId;
  final String siteManagerId;
  final List<OrderProduct> products;

  Order({
    required this.orderId,
    required this.dateToBeDelivered,
    required this.siteId,
    required this.siteManagerId,
    required this.products,
  });
}
