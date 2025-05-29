import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
// import errorHandler from "./error-handler";
import { useDecrypt, addLang } from "./use-helper";

// Definisikan tipe untuk data request post
interface PostData {
  path: string;
  body: Record<string, any>; // Objek yang bisa memiliki properti apa saja
}

class useApi {
  private instance: AxiosInstance;
  private lang: string;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_APP_ENV}/api`, // Ambil host dari env
      headers: {
        Accept: "text/plain"
      }
    });
    this.lang = Cookies.get("lang") ?? "id-ID";

    // Interceptor untuk respon
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        // errorHandler(error);
        return Promise.reject(error?.response?.data ?? error);
      }
    );
  }

  // Method GET
  async get(rawPath: string): Promise<any> {
    try {
      const token = useDecrypt(Cookies.get("hAS-aTH")); // Ambil token dari cookie
      if (token) {
        // Jika ada token, set Authorization header
        this.instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }

      const path = addLang(rawPath, this.lang); // Tambahkan bahasa ke path
      const response = await this.instance.get(path);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data ?? error;
    }
  }

  // Method POST
  async post(data: PostData): Promise<any> {
    try {
      const token = useDecrypt(Cookies.get("hAS-aTH")); // Ambil token dari cookie
      if (token && data.path !== "auth/login") {
        this.instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }

      const path = addLang(data.path, this.lang); // Tambahkan bahasa ke path
      console.log("POST Request Path:", path); // Debug
      console.log("POST Request Body:", data.body); // Debug

      const response = await this.instance.post(path, data.body);
      return response.data;
    } catch (error: any) {
      console.error("Error in POST Request:", error); // Debug tambahan
      throw error?.response?.data ?? error;
    }
  }
}

export default useApi;
