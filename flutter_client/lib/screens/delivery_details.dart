import 'package:flutter/material.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String dropdownValue = 'Item 1';

  var items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  DateTime selectedDate = DateTime.now();
  String description = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              /// Input field for site location ----------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              const Text("Select Site Location"),
              Container(
                  decoration: BoxDecoration(
                    color: Colors.green[50],
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  child: DropdownButton(
                    value: dropdownValue,
                    isExpanded: true,
                    icon: const Icon(Icons.keyboard_arrow_down),
                    items: items.map((String item) {
                      return DropdownMenuItem(
                        value: item,
                        child: Padding(
                          padding: const EdgeInsets.all(
                              8.0),
                          child: Text(item),
                        ),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        dropdownValue = newValue!;
                      });
                    },
                    underline: Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.transparent),
                      ),
                    ),
                  )),
              const SizedBox(height: 20),
              
              // date picker input -------------------------------------------------------->>>>>>>>>>>>>>

              const Text("Expected Delivery Date"),
              Container(
                decoration: BoxDecoration(
                  color: Colors.green[50],
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
                          ..text =
                              selectedDate.toLocal().toString().split(' ')[0],
                        readOnly: true,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: GestureDetector(
                        onTap: () {
                          _selectDate(context);
                        },
                        child: Icon(Icons.calendar_today),
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
                  color: Colors.green[50],
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
            ],
          ),
        ),
      ),
    );
  }

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
}
