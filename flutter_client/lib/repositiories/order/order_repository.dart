import 'dart:convert';

import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/repositiories/order/base_order_repository.dart';
import 'package:flutter_client/repositiories/paths.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:developer' as developer;

class OrderRepository extends BaseOrderRepository {
  @override
  Future<bool> createOrder(Order order) async {
    final Uri orderURL = Uri.https(hostName, orderPath);
    // get token from shared preferences
    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };

    // send request to get all suppliers
    try {
      final requestBody = jsonEncode(
        {
          "supplier": order.supplierId,
          "items": [
            ...order.products.map(
              (product) => product.toJson(),
            )
          ],
          "siteManager": order.siteManagerId,
          "site": order.siteId,
          "dateToBeDelivered": order.dateToBeDelivered.toIso8601String(),
        },
      );

      developer.log("body: ${requestBody.toString()}", name: "OrderRepository");
      final responseBody =
          await http.post(orderURL, headers: headers, body: requestBody);
      // .then((response) => response.body)

      developer.log("responseBody: ${jsonDecode(responseBody.body).toString()}",
          name: "OrderRepository");
      developer.log("responseBody: ${responseBody.statusCode}",
          name: "OrderRepository");
      return true;
    } on TypeError catch (e) {
      developer.log(e.toString(),
          stackTrace: e.stackTrace, error: e, name: "OrderRepository");
      throw Exception(e);
    } catch (e) {
      developer.log(e.toString(), name: "OrderRepository", error: e);
      throw Exception(e);
    }
  }

  @override
  Future<Order> deleteOrder(String id) async {
    return Order(
      supplierId: '1',
      orderId: '1',
      dateToBeDelivered: DateTime.now(),
      siteId: '1',
      siteManagerId: '1',
      products: [],
    );
  }

  @override
  Future<Order> getOrder(String id) async {
    return Order(
      supplierId: '1',
      orderId: '1',
      dateToBeDelivered: DateTime.now(),
      siteId: '1',
      siteManagerId: '1',
      products: [],
    );
  }

  @override
  Future<List<Order>> getOrders() async {
    return [
      Order(
        supplierId: '1',
        orderId: '1',
        dateToBeDelivered: DateTime.now(),
        siteId: '1',
        siteManagerId: '1',
        products: [],
      )
    ];
  }

  @override
  Future<Order> updateOrder(Order order) async {
    return Order(
      supplierId: '1',
      orderId: '1',
      dateToBeDelivered: DateTime.now(),
      siteId: '1',
      siteManagerId: '1',
      products: [],
    );
  }
}
