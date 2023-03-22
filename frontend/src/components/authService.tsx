import { axios } from "./customAxios";

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
}

export default new AuthService();