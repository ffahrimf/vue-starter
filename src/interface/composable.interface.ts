export interface EncryptedData {
  iv: string;
  ciphertext: string;
}

export interface GenericObject {
  [key: string]: any;
}

export interface ErrorMessage {
  PropertyName: string;
  ErrorMessage: string;
}

export type ToastType =
  | "success"
  | "warning"
  | "error"
  | "notification"
  | "info";
