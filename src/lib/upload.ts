import axios from 'axios';

interface KeyAndSecret {
  key: string;
  secret?: string;
}

const upload = (apiUrl: string | undefined, contents: string): Promise<KeyAndSecret> => {
  return new Promise((resolve, reject) => {
    return axios.post(`${apiUrl}/documents`, contents, {
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'text/plain'  // eslint-disable-line
      }
    })
      .then(({ data: { key, secret } }) => resolve({ key, secret }))
      .catch(err => {
        if (err.response?.data?.error) {
          return reject(err.response.data.error);
        }

        return reject('Internal Server Error.');
      });
  });
};

export default upload;
