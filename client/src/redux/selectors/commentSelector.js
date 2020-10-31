import { createSelector } from 'reselect';

export const selectComments = createSelector(
  [(state) => state.comments],
  (comments) => comments
);
