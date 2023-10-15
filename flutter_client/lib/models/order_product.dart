class OrderProduct {
  String productId;
  int quantity;
  double price;
  String title;

  OrderProduct({
    required this.productId,
    required this.quantity,
    required this.price,
    required this.title,
  });

  OrderProduct.init({
    required this.productId,
    required this.price,
    required this.title,
  }) : quantity = 1;

  factory OrderProduct.fromJson(Map<String, dynamic> json) {
    return OrderProduct(
      productId: json['item'],
      quantity: json['quantity'],
      price: json['price'],
      title: json['name'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'item': productId,
      'quantity': quantity,
      'price': price,
      'name': title,
    };
  }
}
