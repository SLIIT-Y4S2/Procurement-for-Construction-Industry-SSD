import 'package:flutter_client/models/order_product.dart';

class Order {
  final String supplierId;
  final String? orderId;
  final DateTime dateToBeDelivered;
  final String siteId;
  final String? siteManagerId;
  final List<OrderProduct> products;

  Order({
    required this.supplierId,
    this.orderId,
    required this.dateToBeDelivered,
    required this.siteId,
    this.siteManagerId,
    required this.products,
  });

  set setSupplierId(String supplierId) {
    supplierId = supplierId;
  }

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
      'dateToBeDelivered': dateToBeDelivered,
      'site': siteId,
      'siteManager': siteManagerId,
      'supplier': supplierId,
      'products': [],
    };
  }
}
