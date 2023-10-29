import 'dart:convert';
import 'dart:developer' as developer;

import 'package:flutter_client/models/site.dart';
import 'package:flutter_client/repositiories/paths.dart';
import 'package:flutter_client/repositiories/sites/base_sites_repository.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class SitesRepository extends BaseSitesRepository {
  @override
  Future<List<Site>> getSites() async {
    final List<Site> siteList = [];
    final Uri siteUrl = Uri.https(hostName, sitePath);

    // get token from shared preferences
    final sharedPreferences = await SharedPreferences.getInstance();
    final token = sharedPreferences.getString('jwt');

    // request headers
    final headers = <String, String>{
      'Authorization': 'Bearer $token',
    };

    // send request to get all suppliers
    try {
      final responseBody = await http
          .get(siteUrl, headers: headers)
          .then((response) => response.body)
          .catchError((error) {
        developer.log(error, name: 'sites_repository', error: error);
        throw Exception(error);
      });

      final List<dynamic> decodedBody = await jsonDecode(responseBody);

      if (decodedBody.isNotEmpty) {
        for (var site in decodedBody) {
          final Site newSite = Site.fromJson(site);
          siteList.add(newSite);
        }
      }

      // get all suppliers and add to list

      return siteList;
    } on TypeError catch (e) {
      developer.log(e.runtimeType.toString(),
          name: 'sites_repository', error: e, stackTrace: e.stackTrace);
      throw Exception(e);
    } catch (e) {
      developer.log(
        e.runtimeType.toString(),
        name: 'sites_repository',
        error: e,
      );
      throw Exception(e);
    }
  }
}
