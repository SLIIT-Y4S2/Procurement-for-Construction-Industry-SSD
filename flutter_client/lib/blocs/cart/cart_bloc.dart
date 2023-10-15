import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:meta/meta.dart';

part 'cart_event.dart';
part 'cart_state.dart';

class CartBloc extends Bloc<CartEvent, CartState> {
  final List<Product> _cart = [];

  CartBloc() : super(CartInitial()) {
    on<LoadCartEvent>(_loadCartHandler);
    on<AddProdctToCartEvent>(_addProductToCartHandler);
    on<ClearCartEvent>(_clearCartHandler);
  }

  // Add product to cart
  void _addProductToCartHandler(
      AddProdctToCartEvent event, Emitter<CartState> emit) {
    _cart.add(event.product);
    emit(ProductCartUpdated(products: _cart));
  }

  //Load Cart
  void _loadCartHandler(LoadCartEvent event, Emitter<CartState> emit) {
    emit(ProductCartState(products: _cart));
  }

  void _clearCartHandler(ClearCartEvent event, Emitter<CartState> emit) {
    _cart.clear();
    emit(ProductCartUpdated(products: _cart));
  }
}
