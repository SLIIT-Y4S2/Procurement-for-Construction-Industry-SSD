import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/models/order_product.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:meta/meta.dart';

part 'cart_event.dart';
part 'cart_state.dart';

class CartBloc extends Bloc<CartEvent, CartState> {
  late User supplier;
  final List<OrderProduct> cart = [];
  double cartTotal = 0;
  final List<Product> _temporaryProducts = [];

  CartBloc() : super(CartInitial()) {
    on<LoadCartEvent>(_loadCartHandler);
    on<AddingProdctToCartEvent>(_addProductToCartHandler);
    on<ClearCartEvent>(_clearCartHandler);
    on<RemoveProductFromCartEvent>(_removeProductFromCartHandler);
    on<IncreaseProductQuantityEvent>(_increaseProductQuantityHandler);
    on<DecreaseProductQuantityEvent>(_decreaseProductQuantityHandler);
    on<ConfirmOrderEvent>(_confirmOrderHandler);
  }

  //Confirm order
  void _confirmOrderHandler(
    ConfirmOrderEvent event,
    Emitter<CartState> emit,
  ) {
    Order order = Order(
      dateToBeDelivered: event.dateToBeDelivered,
      products: event.orderProducts,
      siteManagerId: event.supplier.id,
      siteId: event.siteId,
      supplierId: event.supplier.id,
    );

    emit(OrderConfirmed(order: order));
  }

  //Calculate cart total
  double calculateCartTotal() {
    double cartTotal = 0;
    for (var product in cart) {
      cartTotal += product.price * product.quantity;
    }
    return cartTotal;
  }

  //Increase product quantity
  void _increaseProductQuantityHandler(
      IncreaseProductQuantityEvent event, Emitter<CartState> emit) {
    for (var product in cart) {
      if (product.productId == event.orderProduct.productId) {
        product.quantity = event.orderProduct.quantity + 1;
      }
    }

    cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(orderProducts: cart, cartTotal: cartTotal));
  }

  //Decrease product quantity
  void _decreaseProductQuantityHandler(
      DecreaseProductQuantityEvent event, Emitter<CartState> emit) {
    for (var product in cart) {
      if (product.productId == event.orderProduct.productId) {
        product.quantity--;
      }
    }

    cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(orderProducts: cart, cartTotal: cartTotal));
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
    cart.add(orderProduct);
    _temporaryProducts.add(event.product);

    cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(orderProducts: cart, cartTotal: cartTotal));
  }

  //Load Cart
  void _loadCartHandler(LoadCartEvent event, Emitter<CartState> emit) {
    emit(ProductCartState(orderProduct: cart));
  }

  void _clearCartHandler(ClearCartEvent event, Emitter<CartState> emit) {
    cart.clear();

    emit(ProductCartUpdated(orderProducts: cart, cartTotal: 0));
  }

  void _removeProductFromCartHandler(
    RemoveProductFromCartEvent event,
    Emitter<CartState> emit,
  ) {
    cart.remove(event.orderProduct);

    for (var product in _temporaryProducts) {
      if (product.id == event.orderProduct.productId) {
        emit(
          RestoreProductToProductList(product: product),
        );
      }
    }

    cartTotal = calculateCartTotal();

    emit(ProductCartUpdated(
      orderProducts: cart,
      cartTotal: cartTotal,
    ));
  }
}
