import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/auth/auth_bloc.dart';
import 'package:flutter_client/screens/create_requisition_order_page.dart';
import 'package:flutter_client/constants.dart';
import 'package:flutter_client/screens/my_orders_screen.dart';
import 'package:flutter_client/screens/delivery_advice.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Home'),
          actions: <Widget>[
            IconButton(
              onPressed: () {
                BlocProvider.of<AuthBloc>(context).add(const SignOut());
              },
              icon: const Icon(Icons.logout),
            ),
            IconButton(
              icon: const Icon(Icons.account_circle),
              onPressed: () {},
            ),
            const SizedBox(width: 10),
          ],
          leading: IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
          ),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(25.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Hi, Supun",
                  style: TextStyle(fontSize: 24),
                ),
                const SizedBox(height: 15),
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const CreateRequisitionOrder(),
                      ),
                    );
                  },
                  //Create Order Card
                  child: Card(
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.zero),
                    ),
                    elevation: 8,
                    color: Theme.of(context).colorScheme.primary,
                    child: SizedBox(
                      width: double.infinity,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(
                              Icons.create_new_folder,
                              size: 24,
                              color: Colors.white,
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'Create order',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'You can create orders from this.',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) {
                          return const MyOrders();
                        },
                      ),
                    );
                  },
                  //My Orders Card
                  child: Card(
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.zero),
                    ),
                    elevation: 8,
                    color: Theme.of(context).colorScheme.primary,
                    child: SizedBox(
                      width: double.infinity,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(
                              Icons.view_agenda,
                              size: 24,
                              color: Color.fromARGB(255, 255, 255, 255),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'My orders',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'You can access all the orders you have taken.',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) {
                          return const Deliveryadvice();
                        },
                      ),
                    );
                  },
                  //Dummy Card
                  child: Card(
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.zero),
                    ),
                    elevation: 8,
                    color: Theme.of(context).colorScheme.primary,
                    child: SizedBox(
                      width: double.infinity,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(
                              Icons.delivery_dining,
                              size: 24,
                              color: Color.fromARGB(255, 255, 255, 255),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'Delivery advice',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'You can indicate whether the delivery advice is completed or not.',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}

//         appBar: AppBar(
//           title: const Text('Home'),
//           actions: <Widget>[
//             IconButton(
//               onPressed: () {
//                 BlocProvider.of<AuthBloc>(context).add(SignOut());
//               },
//               icon: const Icon(Icons.logout),
//             ),
//             IconButton(
//               icon: const Icon(Icons.account_circle),
//               onPressed: () {},
//             ),
//             const SizedBox(width: 10),
//           ],
//           leading: IconButton(
//             icon: const Icon(Icons.menu),
//             onPressed: () {
//               Scaffold.of(context).openDrawer();
//             },
//           ),
//         ),
        // body: Center(
        //   child: Padding(
        //     padding: const EdgeInsets.all(25.0),
        //     child: Column(
        //       mainAxisAlignment: MainAxisAlignment.start,
        //       crossAxisAlignment: CrossAxisAlignment.start,
        //       children: [
        //         const Text(
        //           "Hi, Supun",
        //           style: TextStyle(fontSize: 24),
        //         ),
        //         const SizedBox(height: 15),
        //         InkWell(
        //           onTap: () {
        //             Navigator.of(context).push(
        //               MaterialPageRoute(
        //                 builder: (context) => const CreateRequisitionOrder(),
        //               ),
        //             );
        //           },
        //           //Create Order Card
        //           child: Card(
        //             shape: const RoundedRectangleBorder(
        //               borderRadius: BorderRadius.all(Radius.zero),
        //             ),
        //             elevation: 8,
        //             color: Theme.of(context).colorScheme.primary,
        //             child: SizedBox(
        //               width: double.infinity,
        //               child: Padding(
        //                 padding: const EdgeInsets.all(16.0),
        //                 child: Column(
        //                   crossAxisAlignment: CrossAxisAlignment.start,
        //                   children: [
        //                     const Icon(
        //                       Icons.create_new_folder,
        //                       size: 24,
        //                       color: Colors.white,
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'Create order',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                               fontSize: 16,
        //                               fontWeight: FontWeight.bold,
        //                               color: Colors.white),
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'You can create orders from this.',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                               fontSize: 12,
        //                               fontWeight: FontWeight.bold,
        //                               color: Colors.white),
        //                     ),
        //                   ],
        //                 ),
        //               ),
        //             ),
        //           ),
        //         ),
        //         InkWell(
        //           onTap: () {
        //             Navigator.of(context).push(
        //               MaterialPageRoute(
        //                 builder: (context) {
        //                   return const MyOrders();
        //                 },
        //               ),
        //             );
        //           },
        //           //My Orders Card
        //           child: Card(
        //             shape: const RoundedRectangleBorder(
        //               borderRadius: BorderRadius.all(Radius.zero),
        //             ),
        //             elevation: 8,
        //             color: Theme.of(context).colorScheme.primary,
        //             child: SizedBox(
        //               width: double.infinity,
        //               child: Padding(
        //                 padding: const EdgeInsets.all(16.0),
        //                 child: Column(
        //                   crossAxisAlignment: CrossAxisAlignment.start,
        //                   children: [
        //                     const Icon(
        //                       Icons.view_agenda,
        //                       size: 24,
        //                       color: Color.fromARGB(255, 255, 255, 255),
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'My orders',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                             fontSize: 16,
        //                             fontWeight: FontWeight.bold,
        //                             color: Colors.white,
        //                           ),
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'You can access all the orders you have taken.',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                             fontSize: 12,
        //                             fontWeight: FontWeight.bold,
        //                             color: Colors.white,
        //                           ),
        //                     ),
        //                   ],
        //                 ),
        //               ),
        //             ),
        //           ),
        //         ),
        //         InkWell(

        //           onTap: () {
        //             Navigator.of(context).push(
        //               MaterialPageRoute(
        //                 builder: (context) {
        //                   return const Deliveryadvice();
        //                 },
        //               ),
        //             );
        //           },
        //           //Dummy Card
        //           child: Card(
        //             shape: const RoundedRectangleBorder(
        //               borderRadius: BorderRadius.all(Radius.zero),
        //             ),
        //             elevation: 8,
        //             color: Theme.of(context).colorScheme.primary,
        //             child: SizedBox(
        //               width: double.infinity,
        //               child: Padding(
        //                 padding: const EdgeInsets.all(16.0),
        //                 child: Column(
        //                   crossAxisAlignment: CrossAxisAlignment.start,
        //                   children: [
        //                     const Icon(
        //                       Icons.delivery_dining,
        //                       size: 24,
        //                       color: Color.fromARGB(255, 255, 255, 255),
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'Delivery advice',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                               fontSize: 16,
        //                               fontWeight: FontWeight.bold,
        //                               color: Colors.white),
        //                     ),
        //                     const SizedBox(height: 10),
        //                     Text(
        //                       'You can indicate whether the delivery advice is completed or not.',
        //                       style: Theme.of(context)
        //                           .textTheme
        //                           .bodyMedium!
        //                           .copyWith(
        //                               fontSize: 12,
        //                               fontWeight: FontWeight.bold,
        //                               color: Colors.white),
        //                     ),
        //                   ],
        //                 ),
        //               ),
        //             ),
        //           ),
        //         ),
        //       ],
        //     ),
        //   ),
        // ));



