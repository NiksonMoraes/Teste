import { test, expect } from '@playwright/test';
import { generateRandomUsername, generateRandomPassword } from '../../utils/helpers.js';

const BASE_URL = 'https://bookstore.toolsqa.com';

test.describe('BookStore API - Testes de Integração', () => {

  let userData;
  let userToken;
  let bookISBN;
  let userID;

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

    userID = responseBody.userID;

    expect(response.status()).toBe(201);
    expect(responseBody.username).toBe(userData.userName);
    expect(responseBody.userID).toBeTruthy();
  });

  // =========================================
  // TESTE 02 - Gerar Token
  // =========================================
  test('02 - Deve gerar token de autenticação', async ({ request }) => {

    // Criar novo usuário
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const createUser = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    const userResponse = await createUser.json();
    userID = userResponse.userID;

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

  // =========================================
  // TESTE 04 - DESAFIO EXTRA → Adicionar livro à coleção
  // =========================================
  test('04 - [DESAFIO EXTRA] Deve adicionar livro à coleção do usuário', async ({ request }) => {

    // Criar usuário novo
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    let createResponse = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });
    
    const user = await createResponse.json();
    userID = user.userID;

    // Gerar token
    const tokenResponse = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: userData
    });

    const tokenData = await tokenResponse.json();
    userToken = tokenData.token;

    // Buscar livros
    const booksResponse = await request.get(`${BASE_URL}/BookStore/v1/Books`);
    const booksData = await booksResponse.json();
    bookISBN = booksData.books[0].isbn;

    // Adicionar livro ao usuário
    const addBookResponse = await request.post(`${BASE_URL}/BookStore/v1/Books`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          { isbn: bookISBN }
        ]
      }
    });

    expect([200, 201]).toContain(addBookResponse.status());

    const responseBody = await addBookResponse.json();
    expect(responseBody.books).toBeTruthy();

    console.log(`✅ Livro adicionado ao usuário ${userData.userName}`);
  });

});
