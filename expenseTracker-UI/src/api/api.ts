import axios from "axios";
import { enqueueSnackbar } from "notistack";

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
});



/*
 Response interceptor
 Automatically unwraps ApiResponse<T>
*/

instance.interceptors.response.use(
  (response) => {
    // backend format -> { success, message, data - <T> }
    return response.data.data;
  },
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";

    enqueueSnackbar(message, { variant: "error" });

    return Promise.reject(error);
  }
);



/*  GETTING THIS ERROR IN COMPONENTS AFTER ADDING RESPONSE INTERCEPTOR, 
    BECAUSE NOW API METHODS RETURN UNWRAPPED DATA (T) INSTEAD OF AXIOS RESPONSE

Argument of type 'AxiosResponse<any, any, {}>' is not assignable to parameter of type 'SetStateAction<Expense[]>'
const result: AxiosResponse<any, any, {}>Argument of type 'AxiosResponse<any, any, {}>' is not assignable to parameter of type 'SetStateAction<Expense[]>
const result: AxiosResponse<any, any, {}>
*/

const API = {
  get: <T>(url: string) => instance.get<any, T>(url),
  post: <T>(url: string, body?: any) => instance.post<any, T>(url, body),
  put: <T>(url: string, body?: any) => instance.put<any, T>(url, body),
  delete: <T>(url: string) => instance.delete<any, T>(url),
};

export default API;