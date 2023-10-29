import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/models/goods_receipt.dart';
import 'package:flutter_client/repositiories/goods_receipt/base_goods_receipt_repository.dart';
import 'package:meta/meta.dart';

part 'goods_receipt_event.dart';
part 'goods_receipt_state.dart';

class GoodsReceiptBloc extends Bloc<GoodsReceiptEvent, GoodsReceiptState> {
  final GoodsReceiptRepository _goodsReceiptRepository =
      GoodsReceiptRepository();

  GoodsReceiptBloc() : super(GoodsReceiptInitial()) {
    on<GetGoodsReceiptsEvent>(_getGoodsReceiptsHandler);
  }

  // Load products
  void _getGoodsReceiptsHandler(
      GetGoodsReceiptsEvent event, Emitter<GoodsReceiptState> emit) async {
    emit(
      GoodsReceiptLoading(),
    );

    await _goodsReceiptRepository.getGoodsReceipts().then(
      (goodsReceipts) {
        emit(GoodsReceiptsLoaded(goodsReceipts: goodsReceipts));
      },
    ).catchError(
      (error) {
        emit(
          const GoodsReceiptError(
              message: "Error loading goods receipts. Please try again."),
        );
      },
    );
  }
}
