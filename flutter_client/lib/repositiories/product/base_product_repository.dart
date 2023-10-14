import 'package:flutter_client/models/product_model.dart';

abstract class BaseProductrepository {
  Future<List<Product>> getProducts();
}
