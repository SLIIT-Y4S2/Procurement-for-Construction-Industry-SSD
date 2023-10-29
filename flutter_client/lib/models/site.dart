class Site {
  final String id;
  final String name;
  final String address;
  final String city;
  final String mapLocation;
  final String contactNumber;
  final String siteId;

  Site({
    required this.id,
    required this.name,
    required this.address,
    required this.city,
    required this.mapLocation,
    required this.contactNumber,
    required this.siteId,
  });

  factory Site.fromJson(Map<String, dynamic> json) {
    return Site(
      id: json['_id'] as String,
      name: json['name'] as String,
      address: json['address'] as String,
      city: json['city'] as String,
      mapLocation: json['mapLocation'] as String,
      contactNumber: json['contactNumber'] as String,
      siteId: json['siteId'] as String,
    );
  }
}
