import { createSelector } from 'reselect';

export const selectCategory = createSelector(
  [(state) => state.category.categories],
  (categories) => {
    return categories.map((category) => {
      return { ...category, value: category.name, label: category.name };
    });
  }
);

export const selectCurrentCategory = createSelector(
  [(state) => state.category.currentCategory],
  (currentCategory) => currentCategory
);
