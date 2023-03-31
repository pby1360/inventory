import { axios } from "./CustomAxios";

interface Auth {
  id: string;
  name: string;
  roles: Array<string>;
  token: string;
  expiredAt: number;
}

class AuthService {
  
  async login (id:string, password:string) {
    await axios.post('/auth/sign-in', {
      id, password
    }).then(response => {
      this.registerSuccessfulLoginForJwt(response.data);
    }).catch(error => {
      throw(error);
    })
  }

  async loginWithKakao (token:string) {
    await axios.post('/auth/sign-in/kakao', {
      token
    }).then(response => {
      this.registerSuccessfulLoginForJwt(response.data);
    }).catch(error => {
      throw(error);
    })
  }

  registerSuccessfulLoginForJwt(data:Auth) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('name', data.name);
    localStorage.setItem('expire', String(data.expiredAt));
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}

export default new AuthService();