import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/goodReceipts/goods_receipt_bloc.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_client/models/goods_receipt.dart';
import 'package:flutter_client/screens/delivery_confirmation_screen.dart';
import 'package:flutter_client/widgets/delivery_card.dart';

class Deliveryadvice extends StatefulWidget {
  const Deliveryadvice({super.key});

  @override
  State<Deliveryadvice> createState() => _DeliveryadviceState();
}

class _DeliveryadviceState extends State<Deliveryadvice> {
  @override
  void initState() {
    super.initState();
    BlocProvider.of<GoodsReceiptBloc>(context).add(
      const GetGoodsReceiptsEvent(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<GoodsReceiptBloc, GoodsReceiptState>(
      listener: (context, state) {
        if (state is GoodsReceiptMarkedAsReceived) {
          BlocProvider.of<GoodsReceiptBloc>(context).add(
            const GetGoodsReceiptsEvent(),
          );
        }
      },
      child: BlocBuilder<GoodsReceiptBloc, GoodsReceiptState>(
        builder: (context, state) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Delivery Advices'),
            ),
            body: state is GoodsReceiptLoading || state is GoodsReceiptInitial
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                :
                //  state is GoodsReceiptsLoaded
                state is GoodsReceiptsLoaded
                    ? state.goodsReceipts.isNotEmpty
                        ? Container(
                            padding:
                                const EdgeInsets.fromLTRB(24.0, 8.0, 24.0, 8.0),
                            child: ListView.separated(
                              separatorBuilder: (context, index) =>
                                  const SizedBox(
                                height: 10,
                              ),
                              shrinkWrap: true,
                              itemCount: state.goodsReceipts.length,
                              itemBuilder: (context, index) {
                                return DeliveryAdviceCard(
                                  goodsReceipt: state.goodsReceipts[index],
                                );
                              },
                            ),
                          )
                        : const Center(
                            child: Text('No Delivery Advices'),
                          )
                    : state is GoodsReceiptError
                        ? const Center(
                            child: Text('Error'),
                          )
                        : const Center(
                            child: Text('Error'),
                          ),
          );
        },
      ),
    );
  }
}
