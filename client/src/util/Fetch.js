import axios from 'axios';

const fetchData = async (url, method = 'GET', data = null, responseType) => {
  const response = await axios(url, {
    method,
    data: data,
    responseType: responseType ? responseType : 'json',
  });
  return response;
};

export default fetchData;
