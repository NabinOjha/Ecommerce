import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './QuillEditor.scss';

const Quill = ({
  id,
  value,
  placeholder,
  handleChange,
  label
 
}) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);
  const quillRef = useRef();

  useEffect(() => {
    const textValue = quillRef.current.getEditor().getText().slice(0, -1);
    if (touched && textValue.length <= 0) {
      setError('Please provide description!');
    } else {
      setError('');
    }
  }, [touched, value]);

  return (
    <>
      <div className='editor-control'>
        <label className={error ? 'error-label' : null} htmlFor={id}>
         {label}
        </label>
        <ReactQuill
          theme='snow'
          ref={quillRef}
          value={value}
          id={id}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          onBlur={() => setTouched(true)}
        />
        {error ? <span className='quill-error'>{error}</span> : null}
      </div>
    </>
  );
};

export default Quill;
