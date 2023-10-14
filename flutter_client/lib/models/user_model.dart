enum Role {
  siteManager,
  companyManager,
  procurementStaff,
  supplier,
}

class User {
  final String id;
  final String name;
  final String email;
  final String password;
  final Role role;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.role,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
      password: json['password'],
      role: json['role'] == 'siteManager'
          ? Role.siteManager
          : json['role'] == 'companyManager'
              ? Role.companyManager
              : json['role'] == 'procurementStaff'
                  ? Role.procurementStaff
                  : Role.supplier,
    );
  }

  Map<String, dynamic> toJson() => {
        '_id': id,
        'name': name,
        'email': email,
        'password': password,
        'role': role == Role.siteManager
            ? 'siteManager'
            : role == Role.companyManager
                ? 'companyManager'
                : role == Role.procurementStaff
                    ? 'procurementStaff'
                    : 'supplier',
      };
}
