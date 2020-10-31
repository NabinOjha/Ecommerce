const REQUIRE_TYPE = 'REQUIRE_TYPE_VALIDATOR';
const MINLENGTH_TYPE = 'MINLENGTH_TYPE_VALIDATOR';
const EMAIL_TYPE = 'EMAIL_VALIDATOR';

export const REQUIRE = () => {
  return {
    type: REQUIRE_TYPE,
  };
};
export const MINLENGTH = (length) => {
  return {
    type: MINLENGTH_TYPE,
    length,
  };
};

export const ISEMAIL = () => {
  return {
    type: EMAIL_TYPE,
  };
};

export const validate = (value, validators) => {
  let isValid = true;

  if (validators) {
    for (let validator of validators) {
      if (validator.type === REQUIRE_TYPE)
        isValid = isValid && value.trim().length > 0;
      if (validator.type === MINLENGTH_TYPE)
        isValid = isValid && value.length >= validator.length;
      if (validator.type === EMAIL_TYPE)
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }

    return isValid;
  } else {
    return true;
  }
};
