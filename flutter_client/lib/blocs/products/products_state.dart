part of 'products_bloc.dart';

@immutable
sealed class ProductsState {
  const ProductsState();
}

final class ProductsInitial extends ProductsState {}

final class ProductsLoading extends ProductsState {}

final class ProductsError extends ProductsState {
  final String message;

  const ProductsError({
    required this.message,
  });
}

final class ProductsLoaded extends ProductsState {
  final List<User> userProducts;

  const ProductsLoaded({
    required this.userProducts,
  });
}

final class RemoveProductFromList extends ProductsState {
  final int productIndex;

  const RemoveProductFromList({
    required this.productIndex,
  });
}
