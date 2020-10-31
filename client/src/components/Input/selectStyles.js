const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#DDDDDD',
    fontSize: '.8rem',
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#3B6978' : '#e4e3e3',
      color: isSelected ? '#fff' : '#444',
      fontSize: '.8rem',

      ':active': {
        ...styles[':active'],
        backgroundColor: '#fff',
      },
    };
  },
  input: (styles) => ({ ...styles, color: 'blue' }),
  placeholder: (styles) => ({ ...styles, color: '#444' }),
};

export default colourStyles;
