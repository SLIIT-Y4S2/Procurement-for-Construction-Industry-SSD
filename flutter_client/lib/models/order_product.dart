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
  }) : quantity = 0;

  set setQuantity(int value) {
    quantity = value;
  }

  factory OrderProduct.fromJson(Map<String, dynamic> json) {
    return OrderProduct(
      productId: json['item']['itemId'],
      quantity: json['quantity'],
      price: double.parse((json['item']['price']).toString()),
      title: json['item']['name'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "item": productId,
      "quantity": quantity,
      // "price": price,
      // "name": title,
    };
  }
}
