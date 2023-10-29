import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/repositiories/auth/auth_repository.dart';
import 'package:flutter_client/repositiories/order/order_repository.dart';
import 'package:meta/meta.dart';

part 'order_event.dart';
part 'order_state.dart';

class OrderBloc extends Bloc<OrderEvent, OrderState> {
  final OrderRepository _orderRepository = OrderRepository();
  final AuthRepository _authRepository = AuthRepository();
  OrderBloc() : super(const OrderInitial()) {
    on<CreateOrderEvent>(_onCreateOrderHandler);
  }

  void _onCreateOrderHandler(
    CreateOrderEvent event,
    Emitter<OrderState> emit,
  ) async {
    emit(CreatingOrder());
    try {
      Order order = Order(
        supplierId: event.order.supplierId,
        dateToBeDelivered: event.order.dateToBeDelivered,
        siteId: event.order.siteId,
        products: event.order.products,
        siteManagerId: await _authRepository.siteManagerId,
      );
      bool isOrderCreated = await _orderRepository.createOrder(order);
      if (isOrderCreated) {
        emit(const OrderCreated());
      } else {
        emit(const OrderNotCreated(message: 'Failed to create order'));
      }
    } catch (e) {
      emit(OrderNotCreated(message: e.toString()));
    }
  }
}
