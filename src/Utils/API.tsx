const base_url = 'https://safe-anchorage-52970.herokuapp.com/api';

const objectToParam = (object: any) => {
  var listParam: string[] = Object.keys(object).map(
    key => `${key}=${object[key]}`,
  );
  return listParam.join('&');
};

export const API = {
  post: (url: string, content: {}) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    }).catch(err => {
      console.log('ERROR:' + err);
      return err;
    });
  },
  get: (url: string, content: {}) => {
    return fetch(
      url + (Object.keys(content).length ? '?' + objectToParam(content) : ''),
      {
        method: 'GET',
      },
    ).catch(err => {
      console.log('ERROR:' + err);
      return err;
    });
  },
  url_login: base_url + '/user/login',
  url_insects: base_url + '/insects',
  url_me: base_url + '/me',
  url_register: base_url + '/user/register',
};

export interface LoginType {
  token?: string;
  message?: string;
}

export interface InsectType {
  id: number;
  name: string;
  threatlevel: number;
  picture: string;
}
