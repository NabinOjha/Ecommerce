import { useCallback, useState } from 'react';
import FETCH from './../../util/Fetch';

const useFile = () => {
  const [dataUrl, setDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDataUrl = useCallback((file) => {
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      setDataUrl(fileReader.result);
      setLoading(false);
    };
    fileReader.readAsDataURL(file);
  }, []);

  const loadFiles = useCallback((files) => {
    const loadedFiles = Promise.all(
      files.map(async (file) => {
        if (typeof file === 'string') {
          const response = await FETCH(
            `http://localhost:5000/image/${file}`,
            'GET',
            null,
            'blob'
          );

          const loadedFile = new File([response.data], `${file}`, {
            type: response.data.type,
          });

          return loadedFile;
        } else {
          return file;
        }
      })
    );

    return loadedFiles;
  }, []);

  return { dataUrl, loadDataUrl, loading, loadFiles };
};

export default useFile;
