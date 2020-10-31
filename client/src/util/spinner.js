import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div
      className='loader'
      style={{
        height: '85vh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        zIndex: '1000',
      }}
    >
      <Loader
        type='TailSpin'
        color='#00BFFF'
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default Spinner;
