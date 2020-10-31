import { createSelector } from 'reselect';

export const currentUserSelector = createSelector(
  [(state) => state.users.currentUser],
  (currentUser) => currentUser
);
