import 'package:flutter_client/models/order.dart';

abstract class BaseOrderRepository {
  Future<List<Order>> getOrders();
  Future<Order> getOrder(String id);
  Future<bool> createOrder(Order order);
  Future<Order> updateOrder(Order order);
  Future<Order> deleteOrder(String id);
}
