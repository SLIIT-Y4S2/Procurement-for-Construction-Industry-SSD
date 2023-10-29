part of 'goods_receipt_bloc.dart';

@immutable
sealed class GoodsReceiptState {
  const GoodsReceiptState();
}

final class GoodsReceiptInitial extends GoodsReceiptState {}

final class GoodsReceiptLoading extends GoodsReceiptState {}

final class GoodsReceiptError extends GoodsReceiptState {
  final String message;

  const GoodsReceiptError({
    required this.message,
  });
}

final class GoodsReceiptsLoaded extends GoodsReceiptState {
  final List<GoodsReceipt> goodsReceipts;

  const GoodsReceiptsLoaded({
    required this.goodsReceipts,
  });
}
