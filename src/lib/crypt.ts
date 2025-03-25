import CryptoJS from "crypto-js";

const secretKey = process.env.NEXTAUTH_SECRET || ""; // Store securely (e.g., in .env)

// Encrypt Function (AES)
export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decrypt Function (AES)
export function decrypt(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
