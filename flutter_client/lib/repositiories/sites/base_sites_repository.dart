import 'package:flutter_client/models/site.dart';

abstract class BaseSitesRepository {
  Future<List<Site>> getSites();
}
