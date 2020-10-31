import { createSelector } from 'reselect';

export const selectProducts = createSelector(
  [(state) => state.products.products, (state) => state.products.count],
  (products, count) => ({
    products,
    count,
  })
);

export const selectProductsCount = createSelector(
  [(state) => state.products.count, (state) => state.products.page],
  (count, page) => ({
    count,
    page,
  })
);

export const selectCurrentFilter = createSelector(
  [(state) => state.products.filter],
  (filter) => filter
);

export const selectMinMaxPrice = createSelector(
  [(state) => state.products.minMaxPrice],
  (minMaxPrice) => minMaxPrice
);

export const selectCurrentProduct = createSelector(
  [(state) => state.products.currentProduct],
  (currentProduct) => currentProduct
);
