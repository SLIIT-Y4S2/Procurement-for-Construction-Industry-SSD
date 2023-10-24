import 'package:flutter/material.dart';
import 'package:flutter_client/constants.dart';

class DeliveryConfirm extends StatefulWidget {
  const DeliveryConfirm({super.key});

  @override
  State<DeliveryConfirm> createState() => _DeliveryConfirmState();
}

class _DeliveryConfirmState extends State<DeliveryConfirm> {
  bool isChecked = false;

  
  //check box
  void _handleCheckbox(bool? value) {
  setState(() {
    isChecked = value ?? false;
  });
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Delivery confirmation'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(25.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  // shape: const RoundedRectangleBorder(
                  //   borderRadius: BorderRadius.circular(10),
                  // ),
                  elevation: 8,
                  color: kSeedColor,
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
                                        color: Colors.white),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Card(
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
                                'Tokiyo Super Cement - 50KG',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium!
                                    .copyWith(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                              const Spacer(),
                              Checkbox(
                                value: isChecked,
                                onChanged: _handleCheckbox,
                              ),
                              
                            ],
                          ),
                          // const SizedBox(height: 20),
                          // Text(
                          //   'Quantity',
                          //   style: Theme.of(context)
                          //       .textTheme
                          //       .bodyMedium!
                          //       .copyWith(
                          //         fontSize: 12,
                          //         fontWeight: FontWeight.bold,
                          //       ),
                          // ),
                          // SizedBox(
                          //   child: Text(
                          //     '50',
                          //     style: Theme.of(context)
                          //         .textTheme
                          //         .bodyMedium!
                          //         .copyWith(
                          //           fontSize: 12,
                          //           fontWeight: FontWeight.normal,
                          //         ),
                          //   ),
                          // ),
                          // Checkbox(
                          //       value: isChecked,
                          //       onChanged: _handleCheckbox,
                          //     ),
                        ],
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
