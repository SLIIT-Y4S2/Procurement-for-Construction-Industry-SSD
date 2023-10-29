part of 'site_bloc.dart';

@immutable
sealed class SiteState {
  const SiteState();
}

final class SiteInitial extends SiteState {}

final class SiteLoading extends SiteState {}

final class SiteLoaded extends SiteState {
  const SiteLoaded(this.sites);

  final List<Site> sites;
}

final class SiteError extends SiteState {
  const SiteError(this.message);

  final String message;
}
