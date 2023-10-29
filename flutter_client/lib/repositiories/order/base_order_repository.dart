import 'package:flutter_client/models/order.dart';

abstract class BaseOrderRepository {
  Future<List<Order>> getOrders();
  Future<bool> createOrder(Order order);
}
