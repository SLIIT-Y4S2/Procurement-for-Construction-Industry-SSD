part of 'cart_bloc.dart';

@immutable
sealed class CartEvent {
  const CartEvent();
}

class AddProdctToCartEvent extends CartEvent {
  final Product product;
  const AddProdctToCartEvent({required this.product});
}

class LoadCartEvent extends CartEvent {
  const LoadCartEvent();
}

class ClearCartEvent extends CartEvent {
  const ClearCartEvent();
}
