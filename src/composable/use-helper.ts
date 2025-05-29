import CryptoES from "crypto-es";
import {
  EncryptedData,
  ErrorMessage,
  GenericObject,
  ToastType
} from "../interface/composable.interface";
import day from "../plugins/day";
import { toast } from "../components/toast/use-toast";
import Cookies from "js-cookie";

export const useEncrypt = (plaintext: string): EncryptedData | null => {
  if (!plaintext) {
    return null;
  }
  const secretKey = import.meta.env.VITE_APP_SCREET_KEY as string; // Menambahkan tipe eksplisit 'string'
  const iv = CryptoES.lib.WordArray.random(16); // Generate a random IV
  const encrypted = CryptoES.AES.encrypt(plaintext, secretKey, { iv: iv });
  return { iv: iv.toString(), ciphertext: encrypted.toString() };
};

export const useDecrypt = (data: string | null | undefined): string | null => {
  if (!data || data === "null") {
    return null;
  }
  const encrypted: EncryptedData = JSON.parse(data);
  const ciphertext = encrypted.ciphertext;
  const iv = encrypted.iv;
  const secretKey = import.meta.env.VITE_APP_SCREET_KEY as string; // Menambahkan tipe eksplisit 'string'
  const decrypted = CryptoES.AES.decrypt(ciphertext, secretKey, {
    iv: CryptoES.enc.Hex.parse(iv)
  });
  return decrypted.toString(CryptoES.enc.Utf8);
};

export const useQuery = (obj: Record<string, any>): string => {
  const queryString = Object.entries(obj)
    .filter(([, value]) => value !== null && value !== "")
    .map(([key, value]) => key + "=" + encodeURIComponent(value))
    .join("&");

  return queryString.length > 0 ? "?" + queryString : "";
};

export const addLang = (path: string, lang: string): string => {
  return path.includes("?")
    ? `${path}&culture=${lang}`
    : `${path}?culture=${lang}`;
};

export const useResetErr = (err: Record<string, any>): void => {
  for (let key in err) {
    err[key] = "";
  }
};

export const useFilterProperties = (obj: GenericObject): GenericObject => {
  if (obj) {
    // kondisi kalo kosong
    const condition = (value: any): boolean =>
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "string" && value.trim() === "");

    // proses penghapusan properti dari object
    for (let key in obj) {
      const value = obj[key];
      if (condition(value)) {
        delete obj[key];
      }

      // cek validitas tanggal
      if (day(obj[key]).isValid()) {
        if (validateDate(`${obj[key]}`)) {
          obj[key] = day(obj[key]).format("YYYY-MM-DD");
        }
      }
    }
  }
  return obj;
};

const validateDate = (str: string): boolean => {
  const formatStr = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ";
  const dateString = day(str).format(formatStr);
  const cleanDateString = str.replace(/\s*\([^)]*\)\s*/g, "");
  return cleanDateString === dateString;
};

export const useInsertErr = (
  errMsg: ErrorMessage[] | Record<string, string>,
  obj: GenericObject
): void => {
  const isArr = Array.isArray(errMsg);

  if (isArr) {
    (errMsg as ErrorMessage[]).forEach((el) => {
      obj[el.PropertyName] = el.ErrorMessage;
    });
  } else {
    for (let key in errMsg) {
      const errorKey = key.toLowerCase();
      const propKey = Object.keys(obj).find(
        (k) => k.toLowerCase() === errorKey
      );
      if (propKey) {
        obj[propKey] = errMsg[key];
      }
    }
  }
};

export const useToast = (
  message: string,
  type: ToastType,
  position?: string
) => {
  toast({
    title: message,
    position: position || "top-right",
    type: type,
    variant: "filled"
  });
};

export const useRemoveStorage = () => {
  let token = Cookies.get("hAS-aTH");
  if (token) {
    Cookies.remove("hAS-aTH");
    Cookies.remove("glbl-unq-hr");
    Cookies.remove("as-starter");
    Cookies.remove("id_profile");
    localStorage.clear();
  }
};
