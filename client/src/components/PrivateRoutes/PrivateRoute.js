import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectCurrentUserLoading } from '../../redux/selectors/loadingSelector';
import { currentUserSelector } from '../../redux/selectors/userSelectors';
import Spinner from '../../util/spinner';

const PrivateRoute = ({ path, Component, ...rest }) => {
  const currentUserLoading = useSelector(selectCurrentUserLoading);
  const currentUser = useSelector(currentUserSelector);

  if (currentUserLoading.loading) {
    return <Spinner />;
  } else {
    return (
      <Route
        path={path}
        render={(props) =>
          currentUser ? (
            <Component {...rest} {...props} currentUser={currentUser} />
          ) : (
            <Redirect to='/login' {...props} />
          )
        }
      />
    );
  }
};
export default PrivateRoute;
