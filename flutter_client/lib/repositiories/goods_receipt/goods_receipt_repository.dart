import 'package:flutter_client/models/goods_receipt.dart';

abstract class BaseGoodsReceiptRepository {
  Future<List<GoodsReceipt>> getGoodsReceipts();
}
