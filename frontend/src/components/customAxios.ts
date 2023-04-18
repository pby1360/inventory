import Axios, { AxiosInstance } from "axios";

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const axios: AxiosInstance = Axios.create({
  baseURL: url,
});

axios.interceptors.request.use(
  function (config:any) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
  //   config.headers['Content-Type'] = 'application/json';
    return config;
  }, 
  function (error) {
      // 요청 에러 직전 호출됩니다.
      return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
  /*
      http status가 200인 경우
      응답 성공 직전 호출됩니다. 
      .then() 으로 이어집니다.
  */
      return response;
  },

  function (error) {
      if(error.response.status === 401) {
        alert('로그인 시간이 만료 되었습니다.');
        localStorage.clear();
        window.location.replace("/sign-in");
      }
  /*
      http status가 200이 아닌 경우
      응답 에러 직전 호출됩니다.
      .catch() 으로 이어집니다.    
  */
      return Promise.reject(error);
  }
);

export { axios };
