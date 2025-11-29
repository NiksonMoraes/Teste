import { test, expect } from '@playwright/test';
import { generateRandomUsername, generateRandomPassword } from '../../utils/helpers.js';

const BASE_URL = 'https://bookstore.toolsqa.com';

test.describe('BookStore API - Testes de Integração', () => {

  let userData;
  let userToken;
  let bookISBN;

  // =========================================
  // TESTE 01 - Criar Usuário
  // =========================================
  test('01 - Deve criar um novo usuário com sucesso', async ({ request }) => {

    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.username).toBe(userData.userName);
    expect(responseBody.userID).toBeTruthy();
  });

  // =========================================
  // TESTE 02 - Gerar Token
  // =========================================
  test('02 - Deve gerar token de autenticação', async ({ request }) => {

    // Criar novo usuário (obrigatório)
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const createUser = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    // Gerar token
    const response = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: userData
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.status).toBe('Success');
    expect(responseBody.result).toBe('User authorized successfully.');
    expect(responseBody.token).toBeTruthy();

    userToken = responseBody.token;
  });

  // =========================================
  // TESTE 03 - Listar Livros
  // =========================================
  test('03 - Deve listar todos os livros disponíveis', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/BookStore/v1/Books`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.books).toBeTruthy();
    expect(responseBody.books.length).toBeGreaterThan(0);

    bookISBN = responseBody.books[0].isbn;
  });
});
