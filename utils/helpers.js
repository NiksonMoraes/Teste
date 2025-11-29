/**
 Gera um email aleatório para evitar duplicidade
 */
export function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}@teste.com`;
}

/**
 Gera um username aleatório
 */
export function generateRandomUsername() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `user${timestamp}${random}`;
}

/**
 Gera uma senha FORTE compatível com a API BookStore
 A senha terá:
 - 1 letra maiúscula
 - 1 letra minúscula
 - 1 número
 - 1 caractere especial
 - mínimo 10 caracteres
*/
export function generateRandomPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_-+=<>?";

  // Garante os requisitos mínimos
  let password =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    symbols[Math.floor(Math.random() * symbols.length)];

  // Completa a senha até 12 caracteres
  const all = upper + lower + numbers + symbols;
  while (password.length < 12) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password;
}
