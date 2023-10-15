part of 'cart_bloc.dart';

@immutable
sealed class CartState {
  const CartState();
}

final class CartInitial extends CartState {}

class ProductCartUpdated extends CartState {
  final List<Product> products;

  const ProductCartUpdated({
    required this.products,
  });
}

final class ProductCartState extends CartState {
  final List<Product> products;

  const ProductCartState({
    required this.products,
  });
}
