import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/models/order_product.dart';

class SelectedProductCard extends StatefulWidget {
  const SelectedProductCard({
    required this.orderProduct,
    super.key,
  });

  final OrderProduct orderProduct;

  @override
  State<SelectedProductCard> createState() => _SelectedProductCardState();
}

class _SelectedProductCardState extends State<SelectedProductCard> {
  int _productQuantity = 0;
  void _addQuantity() {
    widget.orderProduct.quantity--;
    setState(() {
      _productQuantity++;
    });
  }

  void _deductQuantity() {
    widget.orderProduct.quantity--;

    setState(() {
      if (_productQuantity > 0) {
        _productQuantity--;
      }
    });
  }

  void _onTapDelete() {
    BlocProvider.of<CartBloc>(context).add(
      RemoveProductFromCartEvent(
        orderProduct: widget.orderProduct,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(
          widget.orderProduct.title,
          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
        subtitle: Row(
          children: [
            IconButton(
              onPressed: _deductQuantity,
              icon: const Icon(Icons.remove_circle),
            ),
            Text(
              '$_productQuantity',
              style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
            ),
            IconButton(
              onPressed: _addQuantity,
              icon: const Icon(Icons.add_circle),
            ),
          ],
        ),
        trailing: Column(
          children: [
            Text(
              'LKR ${widget.orderProduct.price.toStringAsFixed(2)}',
              style: Theme.of(context).textTheme.bodySmall!.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
            ),
            Expanded(
              child: IconButton(
                onPressed: _onTapDelete,
                icon: const Icon(
                  Icons.delete_sharp,
                  color: Colors.red,
                ),
              ),
            )
          ],
        ),
        isThreeLine: true,
      ),
    );
  }
}
