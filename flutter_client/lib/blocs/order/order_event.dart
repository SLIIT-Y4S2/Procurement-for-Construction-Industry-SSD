part of 'order_bloc.dart';

@immutable
class OrderEvent {
  const OrderEvent();
}

class CreateOrderEvent extends OrderEvent {
  final Order order;

  const CreateOrderEvent({required this.order});
}
