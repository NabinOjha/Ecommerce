import React from 'react';

import './Form.scss';

const Form = (props) => {
  const {
    headerText,
    button,
    headerClass,
    buttonClass,
    children,
    formStyle,
    handleSubmit,
    buttondisable,
    buttonText,
    containerClass,
    socialMedia = null,
  } = props;
  return (
    <div className={`form-container ${containerClass}`}>
      <form className='form' style={formStyle} onSubmit={handleSubmit}>
        <h3 className={`header ${headerClass}`}>{headerText}</h3>
        {children}
        {socialMedia}
        {button ? (
          button
        ) : (
          <button
            className={`button ${buttonClass} ${
              !buttondisable ? 'disabled' : ''
            }`}
            disabled={!buttondisable}
          >
            {buttonText}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
