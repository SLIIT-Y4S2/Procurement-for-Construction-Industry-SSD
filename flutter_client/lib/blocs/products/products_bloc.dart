import 'package:bloc/bloc.dart';
import 'package:flutter_client/models/product_model.dart';
import 'package:flutter_client/models/user_model.dart';
import 'package:flutter_client/repositiories/product/product_repository.dart';
import 'package:meta/meta.dart';

part 'products_event.dart';
part 'products_state.dart';

class ProductsBloc extends Bloc<ProductsEvent, ProductsState> {
  final ProductRepository _productsRepository = ProductRepository();

  ProductsBloc() : super(ProductsInitial()) {
    on<GetProductsEvent>(_getProductsHandler);
  }

  // Load products
  void _getProductsHandler(
      GetProductsEvent event, Emitter<ProductsState> emit) async {
    emit(
      ProductsLoading(),
    );

    await _productsRepository.getProducts().then(
      (products) {
        emit(ProductsLoaded(userProducts: products));
      },
    ).catchError(
      (error) {
        emit(
          const ProductsError(
              message: "Error loading products. Please try again."),
        );
      },
    );
  }
}
