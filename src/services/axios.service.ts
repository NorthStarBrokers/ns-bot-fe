import axios, { AxiosHeaders } from 'axios';
import store from '@/store';

axios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const headers = new AxiosHeaders();
      config.headers = headers;
    }

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // config.baseURL = isLocal ? 'http://localhost:3000' : import.meta.env.VITE_API_URL;
    config.baseURL = import.meta.env.VITE_API_URL;

    // store.commit("notify/SET_LOADING_STATE", true);
    console.log(config)
    return config;
  },
  (error) => {
    // store.commit("notify/SET_LOADING_STATE", true);
    return Promise.reject(error);
  }
);

/* axios.interceptors.response.use(
  (response) => {
    if (response.status == 200 || response.status == 201) {
      if (response.data.message) {
        Store.commit("notify/SET_SUCCESS", response.data.message);
      }
    }
    Store.commit("notify/SET_LOADING_STATE", false);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      router.push("/logout");
    }
    if (
      error.response.status !== 401 ||
      error.response.status !== 200 ||
      error.response.status !== 201
    ) {
      if (error.response.data.message) {
        Store.commit("notify/SET_ERROR", error.response.data.message);
      }
      // si el error es de validacion, entra aca
      if (error.response.data.errors) {
        if (error.response.data.errors.length > 1)
          Store.commit(
            "notify/SET_ERROR",
            `Validation errors: ${error.response.data.errors.length}`
          );
        else
          Store.commit(
            "notify/SET_ERROR",
            `Validation error: ${error.response.data.errors[0].msg}`
          );
      }
    }
    Store.commit("notify/SET_LOADING_STATE", false);
    return error.response;
  }
); */

export default axios;
