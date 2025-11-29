import { test, expect } from '@playwright/test';
import { generateRandomUsername, generateRandomPassword } from '../../utils/helpers.js';

const BASE_URL = 'https://bookstore.toolsqa.com';

test.describe('BookStore API - Testes de Integração', () => {

  let userData;
  let userToken;
  let bookISBN;

  // ============================
  // TESTE 01 - Criar Usuário
  // ============================
  test('01 - Deve criar um novo usuário com sucesso', async ({ request }) => {

    // Gerar credenciais dinâmicas
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    console.log("STATUS:", response.status());
    const responseBody = await response.json();
    console.log("BODY:", responseBody);
    console.log("SENHA:", userData.password);

    expect(response.status()).toBe(201);
    expect(responseBody.username).toBe(userData.userName);
    expect(responseBody.userID).toBeTruthy();

    console.log(`✅ Usuário criado: ${userData.userName}`);
  });

  // ============================
  // TESTE 02 - Gerar Token
  // ============================
  test('02 - Deve gerar token de autenticação', async ({ request }) => {

    // Criar usuário novamente (API exige usuário novo a cada token)
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const createUser = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    console.log("📌 Criando usuário para token...");
    console.log("STATUS USER:", createUser.status());
    console.log("BODY USER:", await createUser.json());

    // Gerar token
    const response = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: userData
    });

    console.log("STATUS TOKEN:", response.status());
    const responseBody = await response.json();
    console.log("BODY TOKEN:", responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.status).toBe('Success');
    expect(responseBody.result).toBe('User authorized successfully.');
    expect(responseBody.token).toBeTruthy();

    userToken = responseBody.token;

    console.log(`✅ Token gerado com sucesso`);
  });

  // ============================
  // TESTE 03 - Listar Livros
  // ============================
  test('03 - Deve listar todos os livros disponíveis', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/BookStore/v1/Books`);

    console.log("STATUS BOOKS:", response.status());
    const responseBody = await response.json();
    console.log("LIVROS:", responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.books).toBeTruthy();
    expect(responseBody.books.length).toBeGreaterThan(0);

    bookISBN = responseBody.books[0].isbn;

    console.log(`✅ Listagem retornou ${responseBody.books.length} livros`);
    console.log(`📚 Primeiro livro: ${responseBody.books[0].title}`);
  });

});
