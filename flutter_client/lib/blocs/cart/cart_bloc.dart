import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/models/order_product.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:meta/meta.dart';

part 'cart_event.dart';
part 'cart_state.dart';

class CartBloc extends Bloc<CartEvent, CartState> {
  final List<OrderProduct> _cart = [];
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
    emit(ProductCartUpdated(orderProducts: _cart));
  }

  //Load Cart
  void _loadCartHandler(LoadCartEvent event, Emitter<CartState> emit) {
    emit(ProductCartState(orderProduct: _cart));
  }

  void _clearCartHandler(ClearCartEvent event, Emitter<CartState> emit) {
    _cart.clear();
    emit(ProductCartUpdated(orderProducts: _cart));
  }

  void _removeProductFromCartHandler(
    RemoveProductFromCartEvent event,
    Emitter<CartState> emit,
  ) {
    _cart.remove(event.orderProduct);
    // _temporaryProducts.removeWhere((element) {
    //   return element.id == event.orderProduct.productId;
    // });

    for (var product in _temporaryProducts) {
      if (product.id == event.orderProduct.productId) {
        emit(
          RestoreProductToProductList(product: product),
        );
      }
    }

    emit(ProductCartUpdated(orderProducts: _cart));
  }
}
