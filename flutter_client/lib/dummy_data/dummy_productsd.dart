import 'package:flutter_client/models/product_model.dart';

List<Product> dummyProducts = [
  Product(
    userId: '1',
    title: 'Sample Product 1',
    description: 'This is the first sample product description.',
    image: 'sample_image_1.jpg',
    price: 19.99,
    isAvailable: false,
  ),
  Product(
      userId: '2',
      title: 'Sample Product 2',
      description: 'Description for the second sample product.',
      image: 'sample_image_2.jpg',
      price: 29.99,
      isAvailable: false),
  Product(
      userId: '3',
      title: 'Sample Product 3',
      description: 'A third sample product with its own description.',
      image: 'sample_image_3.jpg',
      price: 14.99,
      isAvailable: true),
  Product(
      userId: '4',
      title: 'Sample Product 4',
      description: 'This is a sample product description for the fourth item.',
      image: 'sample_image_4.jpg',
      price: 39.99,
      isAvailable: false),
  Product(
      userId: '5',
      title: 'Sample Product 5',
      description: 'Description for the fifth sample product in the list.',
      image: 'sample_image_5.jpg',
      price: 24.99,
      isAvailable: true),
];
