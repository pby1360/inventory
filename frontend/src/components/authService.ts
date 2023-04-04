import { axios } from "./CustomAxios";

interface Auth {
  id?: string;
  name?: string;
  roles?: Array<string>;
  token: string;
  expiredAt?: number;
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
    localStorage.setItem('user', JSON.stringify(data));
    // localStorage.setItem('id', data.id);
    // localStorage.setItem('name', data.name);
    // localStorage.setItem('expire', String(data.expiredAt));
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
  }

  isExpired() {
    const user = this.user();
    if (user.expiredAt) {
      return new Date().getTime() > user.expiredAt;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.clear();
  }

  user () {
    const userJsonStr = localStorage.getItem('user');
    let user:Auth = {
      token: '',
    };
    if (userJsonStr) {
      user = JSON.parse(userJsonStr);
    }
    return user;
  }
}

export default new AuthService();