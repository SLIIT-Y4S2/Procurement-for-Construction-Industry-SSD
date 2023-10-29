import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/order/order_bloc.dart';
import 'package:flutter_client/widgets/my_orders_card.dart';

class MyOrders extends StatefulWidget {
  const MyOrders({super.key});

  @override
  State<MyOrders> createState() => _MyOrdersState();
}

class _MyOrdersState extends State<MyOrders> {
  @override
  void initState() {
    super.initState();
    BlocProvider.of<OrderBloc>(context).add(const GetOrdersEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My orders'),
      ),
      body: BlocBuilder<OrderBloc, OrderState>(
        builder: (context, state) {
          if (state is GettingOrders) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (state is OrdersRetrieved) {
            return ListView.separated(
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 8,
              ),
              itemCount: state.orders.length,
              itemBuilder: (context, index) {
                return MyOrdersCard(order: state.orders[index]);
              },
              separatorBuilder: (BuildContext context, int index) =>
                  const SizedBox(
                height: 10,
              ),
            );
          } else if (state is ErrorRetrievingOrders) {
            return Center(
              child: Text(state.message),
            );
          } else {
            return const Center(
              child: Text('Something went wrong'),
            );
          }
        },
      ),
    );
  }
}
