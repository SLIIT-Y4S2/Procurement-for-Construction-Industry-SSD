import 'package:flutter/material.dart';
import 'package:flutter_client/screens/home_screen.dart';
import 'package:flutter_client/screens/my_orders_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  final _pages = [
    const HomeScreen(),
    const MyOrders(),
    const HomeScreen(),
  ];

  void _onDestinationSelected(int index) {
    if (_currentIndex == index) {}
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        animationDuration: const Duration(seconds: 1),
        selectedIndex: _currentIndex,
        onDestinationSelected: _onDestinationSelected,
        surfaceTintColor: Colors.white,
        shadowColor: Colors.black,
        elevation: 30,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.note_add_outlined),
            selectedIcon: Icon(Icons.note_add),
            label: 'My Orders',
          ),
          NavigationDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
    );
  }
}
