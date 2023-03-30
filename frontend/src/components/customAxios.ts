import Axios, { AxiosInstance } from "axios";

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

export const axios: AxiosInstance = Axios.create({
  baseURL: url
});
