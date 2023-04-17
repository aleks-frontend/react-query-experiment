import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const axiosRequest = ({ ...options }) => {
  client.defaults.headers.common.Authorization = "Bearer token 123";
  const onSuccess = response => response;
  const onError = error => {
    // some custom logic here
    return error;
  }

  return client(options).then(onSuccess).catch(onError)
};
