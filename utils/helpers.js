// utils/helpers.js
export function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}@teste.com`;
}

export function generateRandomUsername() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}`;
}

export function generateRandomPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@#$%";
  let pwd = "";
  pwd += upper[Math.floor(Math.random() * upper.length)];
  pwd += lower[Math.floor(Math.random() * lower.length)];
  pwd += numbers[Math.floor(Math.random() * numbers.length)];
  pwd += symbols[Math.floor(Math.random() * symbols.length)];
  const all = upper + lower + numbers + symbols;
  while (pwd.length < 12) pwd += all[Math.floor(Math.random() * all.length)];
  return pwd;
}