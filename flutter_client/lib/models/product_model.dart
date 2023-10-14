class Product {
  final String userId;
  final String title;
  final String description;
  final String image;
  final double price;

  Product({
    required this.userId,
    required this.title,
    required this.description,
    required this.image,
    required this.price,
  });

  Map<String, dynamic> toJson() => {
        'user': userId,
        'name': title,
        'description': description,
        'image': image,
        'price': price,
      };

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      userId: json['user'],
      title: json['name'],
      description: json['description'],
      image: json['image'],
      price: json['price'],
    );
  }
}
