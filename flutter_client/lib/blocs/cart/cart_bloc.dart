import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/models/order_product.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:meta/meta.dart';

part 'cart_event.dart';
part 'cart_state.dart';

class CartBloc extends Bloc<CartEvent, CartState> {
  final List<OrderProduct> _cart = [];
  double _cartTotal = 0;
  final List<Product> _temporaryProducts = [];

  CartBloc() : super(CartInitial()) {
    on<LoadCartEvent>(_loadCartHandler);
    on<AddingProdctToCartEvent>(_addProductToCartHandler);
    on<ClearCartEvent>(_clearCartHandler);
    on<RemoveProductFromCartEvent>(_removeProductFromCartHandler);
  }

  // Add product to cart
  void _addProductToCartHandler(
    AddingProdctToCartEvent event,
    Emitter<CartState> emit,
  ) {
    emit(RemoveProductTemporarilyFromProductList(
        productIndex: event.productIndex));
    OrderProduct orderProduct = OrderProduct.init(
      productId: event.product.id,
      price: event.product.price,
      title: event.product.title,
    );
    _cart.add(orderProduct);
    _temporaryProducts.add(event.product);

    for (var product in _cart) {
      _cartTotal += product.price;
    }

    emit(ProductCartUpdated(orderProducts: _cart, cartTotal: _cartTotal));
  }

  //Load Cart
  void _loadCartHandler(LoadCartEvent event, Emitter<CartState> emit) {
    emit(ProductCartState(orderProduct: _cart));
  }

  void _clearCartHandler(ClearCartEvent event, Emitter<CartState> emit) {
    _cart.clear();

    emit(ProductCartUpdated(orderProducts: _cart, cartTotal: 0));
  }

  void _removeProductFromCartHandler(
    RemoveProductFromCartEvent event,
    Emitter<CartState> emit,
  ) {
    _cart.remove(event.orderProduct);

    for (var product in _temporaryProducts) {
      if (product.id == event.orderProduct.productId) {
        emit(
          RestoreProductToProductList(product: product),
        );
      }
    }

    for (var product in _cart) {
      _cartTotal += product.price;
    }

    emit(ProductCartUpdated(
      orderProducts: _cart,
      cartTotal: _cartTotal - event.orderProduct.price,
    ));
  }
}
