part of 'products_bloc.dart';

@immutable
sealed class ProductsState {
  const ProductsState();
}

final class ProductsInitial extends ProductsState {}

final class ProductsLoading extends ProductsState {}

final class ProductsLoaded extends ProductsState {
  final List<Product> products;

  const ProductsLoaded({
    required this.products,
  });
}

class ProductCartUpdated extends ProductsState {
  final List<Product> products;

  const ProductCartUpdated({
    required this.products,
  });
}
