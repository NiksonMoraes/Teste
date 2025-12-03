// tests/api/bookstore.spec.js
import { test, expect } from '@playwright/test';
import { generateRandomUsername, generateRandomPassword } from '../../utils/helpers.js';

const BASE = 'https://bookstore.toolsqa.com';

test.describe('Desafio 1 – BookStore API', () => {

  test('01 - Criar Usuário', async ({ request }) => {
    const user = { userName: generateRandomUsername(), password: generateRandomPassword() };
    const res = await request.post(`${BASE}/Account/v1/User`, { data: user });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.userID).toBeTruthy();
  });

  test('02 - Gerar Token', async ({ request }) => {
    const user = { userName: generateRandomUsername(), password: generateRandomPassword() };
    await request.post(`${BASE}/Account/v1/User`, { data: user });
    const res = await request.post(`${BASE}/Account/v1/GenerateToken`, { data: user });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeTruthy();
  });

  test('03 - Listar Livros', async ({ request }) => {
    const res = await request.get(`${BASE}/BookStore/v1/Books`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.books.length).toBeGreaterThan(0);
  });

  test('04 - [EXTRA] Adicionar livro à coleção', async ({ request }) => {
    const user = { userName: generateRandomUsername(), password: generateRandomPassword() };

    // 1. Criar usuário
    const create = await request.post(`${BASE}/Account/v1/User`, { data: user });
    const { userID } = await create.json();

    // 2. Gerar token
    const tokenRes = await request.post(`${BASE}/Account/v1/GenerateToken`, { data: user });
    const { token } = await tokenRes.json();

    // 3. Pegar ISBN
    const books = await (await request.get(`${BASE}/BookStore/v1/Books`)).json();
    const isbn = books.books[0].isbn;

    // 4. Adicionar livro
    const add = await request.post(`${BASE}/BookStore/v1/Books`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId: userID, collectionOfIsbns: [{ isbn }] }
    });

    expect(add.status()).toBe(201);
  });
});