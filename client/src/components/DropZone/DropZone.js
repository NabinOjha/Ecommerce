import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileImage, FaWindowClose } from 'react-icons/fa';

import './DropZone.scss';

import useFile from './file-hook';

const dragZoneStyle = {
  backgroundColor: '#DDDDDD',
  color: 'gray',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(150px, 1fr))',
  justifyContent: 'center',
  alignContent: 'center',
  justifyItems: 'center',
  alignItems: 'center',
  position: 'relative',
  marginTop: '.8rem',
  padding: '10px',
};

const Image = ({ file, index, removeFile }) => {
  const { dataUrl, loadDataUrl, loading } = useFile();
  // console.log(file);

  useEffect(() => {
    if (file) {
      loadDataUrl(file);
    }
  }, [file, loadDataUrl]);
  return (
    !loading && (
      <div className='imageContainer'>
        <FaWindowClose
          onClick={(e) => {
            e.stopPropagation();
            removeFile(index);
          }}
        />
        <img
          className='thumbImage'
          src={dataUrl && dataUrl}
          style={{
            height: '100px',
            borderRadius: '3px',
          }}
          alt='product'
        />
      </div>
    )
  );
};

function MyDropzone({ id, label, setImages, currentImages, multiple }) {
  const [files, setFiles] = useState(null);
 

  const { loadFiles } = useFile();

  useEffect(() => {
    if (files !== null) {
      setImages(files);
    }
  }, [files, setImages]);

  useEffect(() => {
    let isActive = true;

    const findStringNames =
      currentImages &&
      currentImages.find((currentImage) => typeof currentImage === 'string');
    if (currentImages) {
      if (findStringNames) {
        const convertStringToFiles = async function () {
          const loadedFiles = await loadFiles(currentImages);
          if (isActive) {
            setFiles(loadedFiles);
          }
        };
        convertStringToFiles();
      } else {
        setFiles(currentImages);
      }
    }
    return () => (isActive = false);
  }, [currentImages, loadFiles]);

  const removeFile = useCallback(
    (indexToRemove) => {
      const filteredFiles = files.filter(
        (img, index) => index !== indexToRemove
      );

      setFiles(filteredFiles);
    },
    [files, setFiles]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      !multiple
        ? setFiles([...acceptedFiles])
        : setFiles((files) =>
            files ? [...files, ...acceptedFiles] : [...acceptedFiles]
          );
    },
    [setFiles, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });



  const renderDragFilesInput = () => {
    if (isDragActive) {
      return <p>Drop the files here ...</p>;
    } else if (
      !files ||
      (files && files.length === 0) ||
      (files && files[0] === null)
    ) {
      return (
        <>
          <div className='logo-container'>
            <FaFileImage />
          </div>
        </>
      );
    } else {
      return (
        files &&
        files.map((file, index) => {
          return (
            <Image
              file={file}
              index={index}
              key={index}
              removeFile={removeFile}
            />
          );
        })
      );
    }
  };

  return (
    <>
      <label className='dropzone-label'>{label}</label>
      <div
        {...getRootProps()}
        style={{
          ...dragZoneStyle,
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            files && files.length <= 4 ? 100 / files.length - 2 : 22
          }%, 1fr))`,
        }}
      >
        <input id={id} {...getInputProps()}  />
        {renderDragFilesInput()}
      </div>
    </>
  );
}

export default MyDropzone;
