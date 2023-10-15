import 'package:flutter_client/models/order_product.dart';

class Order {
  final String supplierId;
  final String orderId;
  final DateTime dateToBeDelivered;
  final String siteId;
  final String siteManagerId;
  final List<OrderProduct> products;

  Order({
    required this.supplierId,
    required this.orderId,
    required this.dateToBeDelivered,
    required this.siteId,
    required this.siteManagerId,
    required this.products,
  });
  //TODO Remove this constructor
  // Order.init({
  //   required this.orderId,
  //   required this.dateToBeDelivered,
  //   required this.siteId,
  //   required this.siteManagerId,
  // }) : products = [];

  set setProducts(List<OrderProduct> products) {
    products = products;
  }

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      supplierId: json['supplier'],
      orderId: json['orderId'],
      dateToBeDelivered: DateTime.parse(json['dateToBeDelivered']),
      siteId: json['site'],
      siteManagerId: json['siteManager'],
      products: [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'orderId': orderId,
      'dateToBeDelivered': dateToBeDelivered.toIso8601String(),
      'site': siteId,
      'siteManager': siteManagerId,
      'supplier': supplierId,
      'products': [],
    };
  }
}
