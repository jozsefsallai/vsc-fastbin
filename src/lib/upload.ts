import axios from 'axios';

const upload = (apiUrl: string | undefined, contents: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    return axios.post(`${apiUrl}/documents`, contents, {
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'text/plain'  // eslint-disable-line
      }
    })
      .then(({ data: { key } }) => resolve(key))
      .catch(err => {
        if (err.response?.data?.error) {
          return reject(err.response.data.error);
        }

        return reject('Internal Server Error.');
      });
  });
};

export default upload;
