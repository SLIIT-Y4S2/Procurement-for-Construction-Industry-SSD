import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/repositiories/product/product_repository.dart';
import 'package:meta/meta.dart';

part 'products_event.dart';
part 'products_state.dart';

class ProductsBloc extends Bloc<ProductsEvent, ProductsState> {
  final ProductRepository _productsRepository = ProductRepository();
  final List<Product> _cart = [];

  ProductsBloc() : super(ProductsInitial()) {
    on<GetProductsEvent>(_getProductsHandler);
    on<LoadCartEvent>((event, emit) => null);
    on<AddProdctToCartEvent>(_addProductToCartHandler);
  }

  // Load products
  void _getProductsHandler(
      GetProductsEvent event, Emitter<ProductsState> emit) {
    emit(
      ProductsLoading(),
    );
    _productsRepository.getProducts().then(
      (products) {
        emit(ProductsLoaded(products: products));
      },
    );
  }

  // Add product to cart
  void _addProductToCartHandler(
      AddProdctToCartEvent event, Emitter<ProductsState> emit) {
    _cart.add(event.product);
    emit(ProductCartUpdated(products: _cart));
  }

  //Load Cart
  void _loadCartHandler(LoadCartEvent event, Emitter<ProductsState> emit) {
    emit(ProductCartUpdated(products: _cart));
  }
}
