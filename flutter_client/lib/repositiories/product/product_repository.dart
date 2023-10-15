import 'dart:convert';
import 'dart:developer' as developer;
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/repositiories/paths.dart';
import 'package:flutter_client/repositiories/product/base_product_repository.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ProductRepository extends BaseProductrepository {
  @override
  Future<List<User>> getProducts() async {
    final List<User> supplierList = [];
    final List<String> supplierIdList = [];
    final Uri supplierURL = Uri.https(hostName, supplierPath);

    // get token from shared preferences
    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    // request headers
    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };

    // send request to get all suppliers
    final responseBody = await http
        .get(supplierURL, headers: headers)
        .then((response) => response.body)
        .catchError((error) {
      developer.log(error);
      throw Exception(error);
    });

    final decodedBody = jsonDecode(responseBody);

    // get all suppliers and add to list
    for (var supplier in decodedBody) {
      final user = User.fromJson(supplier);
      supplierList.add(user);
      supplierIdList.add(user.id);
    }

    for (var supplierId in supplierIdList) {
      final productList = await getProductBySupplierId(supplierId);

      for (var product in productList) {
        for (var supplier in supplierList) {
          if (supplier.id == product.supplierId) {
            supplier.products.add(product);
          }
        }
      }
    }

    return supplierList;
  }

  Future<List<Product>> getProductBySupplierId(String supplierID) async {
    // get token from shared preferences
    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    final List<Product> productList = <Product>[];

    // URL to get all suppliers items
    final Uri itemsURL = Uri.https(hostName, 'api/suppliers/$supplierID/items');

    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };
    // send request to get all suppliers items
    final responseBody = await http
        .get(itemsURL, headers: headers)
        .then((response) => response.body)
        .catchError((error) {
      developer.log(error);
      throw Exception(error.toString());
    });

    // decode response body
    final decodedBody = jsonDecode(responseBody);

    // get all suppliers items and add to list
    for (var supplier in decodedBody) {
      final product = Product.fromJson(supplier);
      productList.add(product);
    }
    return productList;
  }
}
