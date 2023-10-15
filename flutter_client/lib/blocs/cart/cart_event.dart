part of 'cart_bloc.dart';

@immutable
sealed class CartEvent {
  const CartEvent();
}

class AddingProdctToCartEvent extends CartEvent {
  final int productIndex;
  final Product product;
  const AddingProdctToCartEvent({
    required this.product,
    required this.productIndex,
  });
}

class LoadCartEvent extends CartEvent {
  const LoadCartEvent();
}

class ClearCartEvent extends CartEvent {
  const ClearCartEvent();
}

class RemoveProductFromCartEvent extends CartEvent {
  final OrderProduct orderProduct;
  const RemoveProductFromCartEvent({
    required this.orderProduct,
  });
}

class IncreaseProductQuantityEvent extends CartEvent {
  final OrderProduct orderProduct;
  const IncreaseProductQuantityEvent({
    required this.orderProduct,
  });
}

class DecreaseProductQuantityEvent extends CartEvent {
  final OrderProduct orderProduct;
  const DecreaseProductQuantityEvent({
    required this.orderProduct,
  });
}
