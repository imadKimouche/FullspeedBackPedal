const base_url = 'https://safe-anchorage-52970.herokuapp.com/';

const API = {
  post: (url: string, content: {}) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    }).catch(error => {
      console.log('ERROR API POST: ' + error);
      return error;
    });
  },
  get: (url: string, content: {}, token = '') => {
    var urlencoded = new URLSearchParams();
    Object.keys(content).forEach((key: any) => {
      urlencoded.append(key, content[key]);
    });
    console.log('urlencoded: ', urlencoded);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.M2FiNzI3ZjctY2E5MS00MDNjLWE1NDUtMzI5YzAxMDBjMTQ3.rS8zL_NgP0tknzeBdmrvCrbAb2PmIMWTM5AEoIEtZlM',
      },
      body: urlencoded,
    }).catch(error => {
      console.log('ERROR API GET: ' + error);
      return error;
    });
  },
  url_login: base_url + 'api/user/login',
  url_register: base_url + 'api/user/register',
  url_me: base_url + 'api/me',
};

export default API;
