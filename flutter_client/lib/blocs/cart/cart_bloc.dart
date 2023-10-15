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
    on<IncreaseProductQuantityEvent>(_increaseProductQuantityHandler);
    on<DecreaseProductQuantityEvent>(_decreaseProductQuantityHandler);
  }

  //Calculate cart total
  double calculateCartTotal() {
    double cartTotal = 0;
    for (var product in _cart) {
      cartTotal += product.price * product.quantity;
    }
    return cartTotal;
  }

  //Increase product quantity
  void _increaseProductQuantityHandler(
      IncreaseProductQuantityEvent event, Emitter<CartState> emit) {
    for (var product in _cart) {
      if (product.productId == event.orderProduct.productId) {
        product.quantity = event.orderProduct.quantity + 1;
      }
    }

    _cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(orderProducts: _cart, cartTotal: _cartTotal));
  }

  //Decrease product quantity
  void _decreaseProductQuantityHandler(
      DecreaseProductQuantityEvent event, Emitter<CartState> emit) {
    for (var product in _cart) {
      if (product.productId == event.orderProduct.productId) {
        product.quantity--;
      }
    }

    _cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(orderProducts: _cart, cartTotal: _cartTotal));
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

    _cartTotal = calculateCartTotal();

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

    _cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(
      orderProducts: _cart,
      cartTotal: _cartTotal,
    ));
  }
}
