/**
 * Gera um email aleatório para evitar duplicidade
 */
export function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}@teste.com`;
}

/**
 * Gera um username aleatório
 */
export function generateRandomUsername() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}`;
}

/**
 * Gera uma senha FORTE compatível com a API BookStore
 * OBS: A API NÃO aceita qualquer símbolo ⇒ mantive apenas símbolos seguros
 */
export function generateRandomPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const safeSymbols = "@#$%";   // ⬅️ somente símbolos aceitos

  // Requisitos mínimos
  let password =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    safeSymbols[Math.floor(Math.random() * safeSymbols.length)];

  const all = upper + lower + numbers + safeSymbols;

  while (password.length < 12) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password;
}
