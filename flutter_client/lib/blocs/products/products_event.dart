part of 'products_bloc.dart';

@immutable
abstract class ProductsEvent {
  const ProductsEvent();
}

class GetProductsEvent extends ProductsEvent {
  const GetProductsEvent();
}

class AddProdctToCartEvent extends ProductsEvent {
  final Product product;
  const AddProdctToCartEvent({required this.product});
}

class LoadCartEvent extends ProductsEvent {
  const LoadCartEvent();
}
