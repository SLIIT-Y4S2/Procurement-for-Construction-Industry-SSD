import 'package:flutter_client/models/user_model.dart';

abstract class BaseProductrepository {
  Future<List<User>> getProducts();
}
