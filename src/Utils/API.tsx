
const base_url = 'https://safe-anchorage-52970.herokuapp.com/';

const API = {
    post: (url : string, content: {})=>{
        return fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        })
        .catch((err) => {
            console.log("ERROR:" + err)
            return err
        });
    },
    url_login: base_url + 'api/user/login',
    url_register: base_url + 'api/user/register',
}

export default API