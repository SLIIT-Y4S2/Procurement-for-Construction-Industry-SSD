part of 'goods_receipt_bloc.dart';

@immutable
abstract class GoodsReceiptEvent {
  const GoodsReceiptEvent();
}

class GetGoodsReceiptsEvent extends GoodsReceiptEvent {
  const GetGoodsReceiptsEvent();
}
