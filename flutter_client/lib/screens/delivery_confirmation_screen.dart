import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/goodReceipts/goods_receipt_bloc.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/models/goods_receipt.dart';

class DeliveryConfirm extends StatefulWidget {
  final GoodsReceipt goodsReceipt;
  const DeliveryConfirm({super.key, required this.goodsReceipt});

  @override
  State<DeliveryConfirm> createState() => _DeliveryConfirmState();
}

class _DeliveryConfirmState extends State<DeliveryConfirm> {
  late List<bool> _isChecked;
  @override
  void initState() {
    super.initState();
    if (widget.goodsReceipt.status == GoodsReceiptStatus.received)
      _isChecked = List<bool>.filled(widget.goodsReceipt.items.length, true);
    else
      _isChecked = List<bool>.filled(widget.goodsReceipt.items.length, false);
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<GoodsReceiptBloc, GoodsReceiptState>(
      listener: (context, state) {
        if (state is GoodsReceiptMarkedAsReceived) {
          Navigator.of(context).pop();
        }
      },
      child: BlocBuilder<GoodsReceiptBloc, GoodsReceiptState>(
        builder: (context, state) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Delivery confirmation'),
            ),
            body: Center(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16.0, 8.0, 16.0, 8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Card(
                      // shape: const RoundedRectangleBorder(
                      //   borderRadius: BorderRadius.circular(10),
                      // ),
                      elevation: 8,
                      color: kSeedColor,
                      child: SizedBox(
                        width: double.infinity,
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.goodsReceipt.goodsReceiptId,
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium!
                                        .copyWith(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    ListView.separated(
                      separatorBuilder: (context, index) => const SizedBox(
                        height: 10,
                      ),
                      shrinkWrap: true,
                      itemCount: widget.goodsReceipt.items.length,
                      itemBuilder: (context, index) {
                        return Card(
                          shape: const RoundedRectangleBorder(
                            borderRadius: BorderRadius.all(Radius.zero),
                          ),
                          elevation: 8,
                          child: SizedBox(
                            width: double.infinity,
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    widget.goodsReceipt.items[index].item.title,
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium!
                                        .copyWith(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                        ),
                                  ),
                                  const Spacer(),
                                  Text(
                                    'Qty:',
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium!
                                        .copyWith(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w100,
                                        ),
                                  ),
                                  Text(
                                    widget.goodsReceipt.items[index].quantity
                                        .toString(),
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium!
                                        .copyWith(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                        ),
                                  ),
                                  Checkbox(
                                    value: _isChecked[index],
                                    onChanged: (val) {
                                      setState(
                                        () {
                                          _isChecked[index] = val ?? false;
                                        },
                                      );
                                    },
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            bottomNavigationBar: widget.goodsReceipt.status ==
                    GoodsReceiptStatus.received
                ? null
                : Padding(
                    padding: const EdgeInsets.fromLTRB(25.0, 0, 25.0, 16.0),
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          if (_isChecked.contains(false)) return;
                          if (state is GoodsReceiptMarkingAsReceived) return;
                          BlocProvider.of<GoodsReceiptBloc>(context).add(
                            MarkAsReceivedEvent(
                              widget.goodsReceipt.goodsReceiptId,
                            ),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          backgroundColor: _isChecked.contains(false)
                              ? Colors.grey[200]
                              : kSeedColor,
                        ),
                        child: state is GoodsReceiptMarkingAsReceived
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                ),
                              )
                            : Text('Confirm',
                                style: TextStyle(
                                  color: _isChecked.contains(false)
                                      ? Colors.black
                                      : Colors.white,
                                )),
                      ),
                    ),
                  ),
          );
        },
      ),
    );
  }
}
