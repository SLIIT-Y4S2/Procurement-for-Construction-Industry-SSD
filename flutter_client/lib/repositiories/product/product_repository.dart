import 'package:flutter_client/dummy_data/dummy_productsd.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/repositiories/product/base_product_repository.dart';

class ProductRepository extends BaseProductrepository {
  @override
  Future<List<Product>> getProducts() async {
    return dummyProducts;
  }
}
