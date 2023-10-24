import 'package:flutter_client/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_client/screens/delivery_confirmation.dart';

class OrderButtonProperties {
  final Color color;
  final String text;

  OrderButtonProperties(this.color, this.text);
}

class Deliveryadvice extends StatelessWidget {
  const Deliveryadvice({super.key});

  final String orderState = '';

  OrderButtonProperties getButtonProperties(String state) {
    switch (state) {
      case 'Completed':
        return OrderButtonProperties(approvedAndOrderCompleted, 'Completed');
      // case 'Pending':
      //   return OrderButtonProperties(partialyDelivered, 'Pending');
      // case 'placed':
      //   return OrderButtonProperties(placed, 'Placed');
      // case 'partially delivered':
      //   return OrderButtonProperties(partialyDelivered, 'Partially delivered');
      default:
        return OrderButtonProperties(declined, 'Not completed');
    }
  }

  @override
  Widget build(BuildContext context) {
    final buttonProperties = getButtonProperties(orderState);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Delivery Advices'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SearchBar(
                padding: MaterialStatePropertyAll<EdgeInsets>(
                    EdgeInsets.symmetric(horizontal: 16.0)),
                leading: Icon(Icons.search),
                shape: MaterialStatePropertyAll<OutlinedBorder>(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(8),
                    ),
                  ),
                ),
                backgroundColor: MaterialStatePropertyAll<Color>(
                  Colors.white,
                ),
                surfaceTintColor: MaterialStatePropertyAll<Color>(
                  Colors.white,
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              InkWell(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const DeliveryConfirm(),
                    ),
                  );
                },
                child: Card(
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.zero),
                  ),
                  elevation: 8,
                  child: SizedBox(
                    width: double.infinity,
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Delivery Advice 1',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium!
                                    .copyWith(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                              const Spacer(),
                              Text(
                                'Date',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium!
                                    .copyWith(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          Text(
                            'Supplier name',
                            style: Theme.of(context)
                                .textTheme
                                .bodyMedium!
                                .copyWith(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),

                          // button -------------------->>>>>>>>>>
                          Row(
                            children: [
                              Text(
                                'Rs.25.000',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium!
                                    .copyWith(
                                      fontSize: 12,
                                      fontWeight: FontWeight.normal,
                                    ),
                              ),
                              const Spacer(),
                              Container(
                                decoration: BoxDecoration(
                                  color: buttonProperties.color,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: TextButton(
                                  onPressed: null,
                                  child: Text(
                                    buttonProperties.text,
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                ),
                              ),
                            ],
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
      ),
    );
  }
}
