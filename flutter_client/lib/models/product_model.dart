class Product {
  final String id;
  final String supplierId;
  final String itemId;
  final String title;
  final String description;
  final double price;
  final bool isAvailable;

  Product({
    required this.id,
    required this.supplierId,
    required this.itemId,
    required this.title,
    required this.description,
    required this.price,
    required this.isAvailable,
  });

  Map<String, dynamic> toJson() => {
        '_id': id,
        'supplier': supplierId,
        'itemId': itemId,
        'name': title,
        'description': description,
        'price': price,
        'active': isAvailable,
      };

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['_id'],
      supplierId: json['supplier'],
      itemId: json['itemId'],
      title: json['name'],
      description: json['description'],
      price: double.parse(json['price'].toString()),
      isAvailable: json['active'],
    );
  }
}
