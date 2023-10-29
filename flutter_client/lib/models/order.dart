import 'package:flutter_client/models/order_product.dart';

class Order {
  final String supplierId;
  final String? orderId;
  final DateTime dateToBeDelivered;
  final String siteId;
  final String? siteManagerId;
  final List<OrderProduct> products;
  final String? status;
  final double? total;

  Order({
    required this.supplierId,
    this.orderId,
    required this.dateToBeDelivered,
    required this.siteId,
    this.siteManagerId,
    this.status,
    required this.products,
    this.total,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      supplierId: json['supplier']['_id'],
      orderId: json['orderId'],
      dateToBeDelivered:
          DateTime.now(), //DateTime.parse(json['dateToBeDelivered']),
      siteId: json['site']['_id'],
      siteManagerId: json['siteManager']['_id'],
      products: (json['items'] as List<dynamic>).map<OrderProduct>((product) {
        return OrderProduct.fromJson(product);
      }).toList(),
      status: json['status'],
      total: int.parse(json['total'].toString()).toDouble(),
    );
  }

  set setProducts(List<OrderProduct> products) {
    products = products;
  }

  set setSupplierId(String supplierId) {
    supplierId = supplierId;
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
