import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_client/blocs/cart/cart_bloc.dart';
import 'package:flutter_client/blocs/order/order_bloc.dart';
import 'package:flutter_client/blocs/site/site_bloc.dart';
import 'package:flutter_client/models/order.dart';
import 'package:flutter_client/models/site.dart';

class DeliveryDetailsScreen extends StatefulWidget {
  const DeliveryDetailsScreen({super.key});

  @override
  State<DeliveryDetailsScreen> createState() => _DeliveryDetailsScreenState();
}

class _DeliveryDetailsScreenState extends State<DeliveryDetailsScreen> {
  String _dropdownValue = '';
  late String _selectedSite;
  double _cartTotal = 0;

  final List<Site> _sites = [];

  DateTime selectedDate = DateTime.now();

  String description = '';

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    BlocProvider.of<SiteBloc>(context).add(const GetSitesEvent());
    setState(() {
      _cartTotal = BlocProvider.of<CartBloc>(context).cartTotal;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Delivery Details",
          style: Theme.of(context).textTheme.titleMedium!.copyWith(
                fontWeight: FontWeight.w900,
              ),
        ),
      ),
      body: MultiBlocListener(
        listeners: [
          BlocListener<SiteBloc, SiteState>(
            listener: (context, state) {
              if (state is SiteLoaded) {
                setState(() {
                  _sites.addAll(state.sites);
                });

                _dropdownValue = _sites[0].siteId;
              }
            },
          ),
          BlocListener<OrderBloc, OrderState>(
            listener: (context, state) {
              if (state is OrderCreated) {
                // BlocProvider.of<CartBloc>(context).add(const ClearCartEvent());
                // Navigator.of(context).pop();
              }

              if (state is OrderNotCreated) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(state.message),
                  ),
                );
              }

              if (state is CreatingOrder) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Creating Order"),
                  ),
                );
              }
            },
          ),
        ],
        child: BlocBuilder<SiteBloc, SiteState>(
          builder: (context, state) {
            return state is SiteLoaded
                ? _sites.isNotEmpty
                    ? SingleChildScrollView(
                        child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              /// Input field for site location ----------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                              const Text("Select Site Location"),
                              DropdownButton(
                                value: _dropdownValue,
                                isExpanded: true,
                                icon: const Icon(Icons.keyboard_arrow_down),
                                items: _sites
                                    .map((site) => DropdownMenuItem(
                                          value: site.siteId,
                                          child: Text(site.name),
                                        ))
                                    .toList(),
                                onChanged: (String? selectedSite) {
                                  setState(
                                    () {
                                      _dropdownValue = selectedSite!;
                                      _selectedSite = _sites
                                          .where((site) =>
                                              site.siteId == selectedSite)
                                          .first
                                          .id;
                                      // _sites.firstWhere(
                                      //     (element) =>
                                      //         element.siteId == newValue);
                                    },
                                  );
                                },
                                underline: Container(
                                  decoration: BoxDecoration(
                                    border:
                                        Border.all(color: Colors.transparent),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 20),

                              // date picker input -------------------------------------------------------->>>>>>>>>>>>>>

                              const Text("Expected Delivery Date"),
                              Container(
                                decoration: BoxDecoration(
                                  color: Theme.of(context).colorScheme.surface,
                                  borderRadius: BorderRadius.circular(4.0),
                                ),
                                child: Row(
                                  children: [
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: TextFormField(
                                        decoration: const InputDecoration(
                                          border: InputBorder.none,
                                        ),
                                        controller: TextEditingController()
                                          ..text = selectedDate
                                              .toLocal()
                                              .toString()
                                              .split(' ')[0],
                                        readOnly: true,
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: GestureDetector(
                                        onTap: () {
                                          _selectDate(context);
                                        },
                                        child: const Icon(Icons.calendar_today),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 20),
                              const Text("Additional Notes"),
                              Container(
                                height: 200,
                                decoration: BoxDecoration(
                                  color: Theme.of(context).colorScheme.surface,
                                  borderRadius: BorderRadius.circular(4.0),
                                ),
                                child: TextFormField(
                                  maxLines: null,
                                  onChanged: (value) {
                                    description = value;
                                  },
                                  decoration: const InputDecoration(
                                    border: InputBorder.none,
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 100,
                              ),
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                  backgroundColor:
                                      Theme.of(context).colorScheme.primary,
                                ),
                                onPressed: () {
                                  BlocProvider.of<OrderBloc>(context).add(
                                    CreateOrderEvent(
                                      order: Order(
                                        supplierId:
                                            BlocProvider.of<CartBloc>(context)
                                                .supplier
                                                .id,
                                        dateToBeDelivered: selectedDate,
                                        siteId: _selectedSite,
                                        products:
                                            BlocProvider.of<CartBloc>(context)
                                                .cart,
                                      ),
                                    ),
                                  );
                                  // Navigator.of(context).pop();
                                },
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      'Total: LKR ${_cartTotal.toStringAsFixed(2)}',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyMedium!
                                          .copyWith(
                                            color: Colors.white,
                                          ),
                                    ),
                                    const Spacer(),
                                    Text(
                                      'Finish',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyMedium!
                                          .copyWith(
                                            color: Colors.white,
                                          ),
                                    ),
                                    const Icon(
                                      Icons.chevron_right,
                                      color: Colors.white,
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                    : const Center(
                        child: Text("No Sites Found"),
                      )
                : const Center(
                    child: CircularProgressIndicator(),
                  );
          },
        ),
      ),
    );
  }
}
