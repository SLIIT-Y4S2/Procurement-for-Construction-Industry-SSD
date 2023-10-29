import 'dart:convert';
import 'dart:developer' as developer;
import 'package:flutter_client/repositiories/paths.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_client/models/goods_receipt.dart';
import 'package:flutter_client/repositiories/goods_receipt/goods_receipt_repository.dart';

class GoodsReceiptRepository extends BaseGoodsReceiptRepository {
  @override
  Future<List<GoodsReceipt>> getGoodsReceipts() async {
    final List<GoodsReceipt> goodsReceiptList = [];
    final Uri goodsReceiptURL = Uri.https(hostName, getGoodsReceiptPath);

    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };

    // send request to get all GOODS RECEIPTS
    final responseBody = await http
        .get(goodsReceiptURL, headers: headers)
        .then((response) => response.body)
        .catchError((error) {
      developer.log(error);
      throw Exception(error);
    });
    final decodedBody = jsonDecode(responseBody);

    // get all GOODS RECEIPTS and add to list
    try {
      for (var goodsReceiptJson in decodedBody) {
        final goodsReceipt = GoodsReceipt.fromJson(goodsReceiptJson);
        goodsReceiptList.add(goodsReceipt);
      }
    } on TypeError catch (e) {
      developer.log('Error decoding json', stackTrace: e.stackTrace, error: e);
      throw Exception(e);
    } on Exception catch (e) {
      developer.log(e.toString());
      throw Exception(e);
    } catch (e) {
      developer.log(e.toString());
      throw Exception(e);
    }

    return goodsReceiptList;
  }

  Future<void> markedAsReceived(String goodsReceiptNumber) async {
    final Uri goodsReceiptURL =
        Uri.https(hostName, '$markAsReceivedPath/$goodsReceiptNumber/received');

    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };

    await http
        .patch(goodsReceiptURL, headers: headers)
        .then((response) => response.body)
        .catchError((error) {
      developer.log(error);
      throw Exception(error);
    });
  }
}
