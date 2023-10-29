import 'package:flutter_client/models/product_model.dart';

enum GoodsReceiptStatus { pendingShipping, received }

class GoodsReceiptItem {
  final Product item;
  final int quantity;

  GoodsReceiptItem({
    required this.item,
    required this.quantity,
  });
}

class GoodsReceipt {
  final String id;
  final String supplier;
  final String site;
  final String siteManager;
  final String goodsReceiptId;
  final GoodsReceiptStatus status;
  final List<GoodsReceiptItem> items;
  final DateTime createdAt;

  GoodsReceipt({
    required this.id,
    required this.supplier,
    required this.site,
    required this.siteManager,
    required this.goodsReceiptId,
    required this.status,
    required this.items,
    required this.createdAt,
  });

  factory GoodsReceipt.fromJson(Map<String, dynamic> json) {
    return GoodsReceipt(
      id: json['_id'],
      supplier: json['supplier'],
      site: json['site'],
      siteManager: json['siteManager'],
      goodsReceiptId: json['goodReceiptId'],
      status: json['status'] == 'shipped'
          ? GoodsReceiptStatus.received
          : GoodsReceiptStatus.pendingShipping,
      items: json['items']
          .map<GoodsReceiptItem>(
            (item) => GoodsReceiptItem(
              item: Product.fromJson(item['item']),
              quantity: item['quantity'],
            ),
          )
          .toList(),
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
