class Product {
  final String userId;
  final String title;
  final String description;
  final String image;
  final double price;
  final bool isAvailable;

  Product({
    required this.userId,
    required this.title,
    required this.description,
    required this.image,
    required this.price,
    required this.isAvailable,
  });

  Map<String, dynamic> toJson() => {
        'user': userId,
        'name': title,
        'description': description,
        'image': image,
        'price': price,
        'isAvailable': isAvailable,
      };

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      userId: json['user'],
      title: json['name'],
      description: json['description'],
      image: json['image'],
      price: json['price'],
      isAvailable: json['isAvailable'],
    );
  }
}
