import 'package:flutter/material.dart';
import 'package:flutter_client/screens/create_requisition_order_page.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
      ),
      body: Center(
        child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const CreateRequisitionOrder(),
                ),
              );
            },
            child: const Text('Create Requisition Order')),
      ),
    );
  }
}
