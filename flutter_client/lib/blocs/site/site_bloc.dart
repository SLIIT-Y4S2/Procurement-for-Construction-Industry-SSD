import 'dart:developer' as developer;

import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/site.dart';
import 'package:flutter_client/repositiories/sites/sites_repository.dart';
import 'package:meta/meta.dart';

part 'site_event.dart';
part 'site_state.dart';

class SiteBloc extends Bloc<SiteEvent, SiteState> {
  final SitesRepository _sitesRepository = SitesRepository();

  SiteBloc() : super(SiteInitial()) {
    on<GetSitesEvent>(_onGetSiteEventHandler);
  }

  void _onGetSiteEventHandler(
      GetSitesEvent event, Emitter<SiteState> emit) async {
    emit(SiteLoading());
    developer.log("Sites", name: 'site_bloc');

    await _sitesRepository.getSites().then((sites) {
      developer.log("Sites: ${sites.length}", name: 'site_bloc');
      emit(SiteLoaded(sites));
    }).catchError((error) {
      emit(SiteError(error.toString()));
    });
  }
}
