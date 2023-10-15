part of 'cart_bloc.dart';

@immutable
sealed class CartState {
  const CartState();
}

final class CartInitial extends CartState {}

class ProductCartUpdated extends CartState {
  final List<OrderProduct> orderProducts;
  final double cartTotal;

  const ProductCartUpdated({
    required this.orderProducts,
    required this.cartTotal,
  });
}

final class ProductCartState extends CartState {
  final List<OrderProduct> orderProduct;

  const ProductCartState({
    required this.orderProduct,
  });
}

final class RemoveProductTemporarilyFromProductList extends CartState {
  final int productIndex;

  const RemoveProductTemporarilyFromProductList({
    required this.productIndex,
  });
}

final class RestoreProductToProductList extends CartState {
  final Product product;

  const RestoreProductToProductList({
    required this.product,
  });
}
