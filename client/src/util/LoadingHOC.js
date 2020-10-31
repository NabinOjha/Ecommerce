import React, { useState, useCallback } from 'react';

import Spinner from './spinner';

const withLoading = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const setLoadingState = useCallback((loadingBool) => {
      setLoading(loadingBool);
    }, []);

    return (
      <>
        {loading && <Spinner />}
        <Component
          {...props}
          setLoadingState={setLoadingState}
          isLoading={loading}
        />
      </>
    );
  };
};

export default withLoading;
