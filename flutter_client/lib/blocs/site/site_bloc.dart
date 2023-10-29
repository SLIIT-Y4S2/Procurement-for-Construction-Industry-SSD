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

    await _sitesRepository.getSites().then((sites) {
      emit(SiteLoaded(sites));
    }).catchError((error) {
      emit(SiteError(error.toString()));
    });
  }
}
