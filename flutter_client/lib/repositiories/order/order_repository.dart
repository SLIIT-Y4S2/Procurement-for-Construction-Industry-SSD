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

    final body = {
      'orderId': order.orderId,
      'dateToBeDelivered': order.dateToBeDelivered.toString(),
      'site': order.siteId,
      'siteManager': order.siteManagerId,
      'supplier': order.supplierId,
      'products': [
        ...order.products.map(
          (product) => product.toJson(),
        )
      ],
    };

    // send request to get all suppliers
    final responseBody = await http
        .post(orderURL, headers: headers, body: body)
        // .then((response) => response.body)
        .catchError((error) {
      developer.log(error);
      throw Exception(error);
    });
    developer.log("responseBody: ${responseBody.statusCode}");
    return true;
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
