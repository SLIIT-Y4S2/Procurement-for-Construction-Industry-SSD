import 'package:flutter_client/models/product_model.dart';

enum Role {
  siteManager,
  companyManager,
  procurementStaff,
  supplier,
}

class User {
  final String id;
  final String name;
  final String userId;
  final String email;
  final Role role;
  final String contactNumber;
  final List<Product> products;

  User({
    required this.id,
    required this.name,
    required this.userId,
    required this.email,
    required this.role,
    required this.contactNumber,
  }) : products = [];

  set products(List<Product> productList) {
    products = productList;
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      name: json['name'],
      userId: json['userId'],
      email: json['email'],
      role: json['role'] == 'siteManager'
          ? Role.siteManager
          : json['role'] == 'companyManager'
              ? Role.companyManager
              : json['role'] == 'procurementStaff'
                  ? Role.procurementStaff
                  : Role.supplier,
      contactNumber: json['contactNumber'],
    );
  }
}
