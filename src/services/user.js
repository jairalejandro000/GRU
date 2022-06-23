import axios from 'axios';

const URL = 'http://165.227.181.97:80/api/';

const logIn = (user) => {
    const request = axios.post(URL + 'auth/login', user)
}
