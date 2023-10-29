part of 'goods_receipt_bloc.dart';

@immutable
abstract class GoodsReceiptEvent {
  const GoodsReceiptEvent();
}

class GetGoodsReceiptsEvent extends GoodsReceiptEvent {
  const GetGoodsReceiptsEvent();
}

class MarkAsReceivedEvent extends GoodsReceiptEvent {
  final String goodsReceiptNumber;
  const MarkAsReceivedEvent(this.goodsReceiptNumber);
}
