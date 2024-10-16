import CryptoJS from "crypto-js";

const SECRET_KEY = "3x@mP1e#9K8z!Yq$6D7nL4wZs#$";

export function encryptData(data: string) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
