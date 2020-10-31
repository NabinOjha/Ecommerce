import { createSelector } from 'reselect';

export const selectCurrentUserLoading = createSelector(
  [(state) => state.loading.GET_CURRENTUSER],
  (loading = { loading: true }) => loading
);

export const productsLoadingSelector = createSelector(
  [
    (state) => state.loading.GET_PRODUCTS,
    (state) => state.loading.DELETE_PRODUCT,
    (state) => state.loading.CREATE_PRODUCT,
  ],
  (
    loadingProducts = { loading: true },
    deletingProducts = { loading: false },
    creatingProduct = { loading: false }
  ) => {
    return {
      loading:
        loadingProducts.loading ||
        deletingProducts.loading ||
        creatingProduct.loading,
    };
  }
);

export const selectCreateCategoryLoading = createSelector(
  [(state) => state.loading.CREATE_CATEGORY],
  (categoryLoading = { loading: true }) => categoryLoading
);

export const selectShopPageLoading = createSelector(
  [(state) => state.loading.MAX_PRICE, (state) => state.loading.GET_CATEGORIES],
  (priceLoading = { loading: true }, categoryLoading = { loading: true }) => {
    return priceLoading || categoryLoading;
  }
);

export const selectHomePageLoading = createSelector(
  [
    (state) => state.loading.GET_PRODUCTS,
    (state) => state.loading.GET_CATEGORIES,
  ],
  (productLoading = { loading: true }, categoryLoading = { loading: true }) =>
    productLoading || categoryLoading
);

export const selectCurrentProductLoading = createSelector(
  [(state) => state.loading.GET_PRODUCT, (_, initialState) => initialState],
  (currentProductLoading, initialState) => currentProductLoading || initialState
);
