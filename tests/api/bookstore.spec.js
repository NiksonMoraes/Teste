import { test, expect } from '@playwright/test';
import { generateRandomUsername, generateRandomPassword } from '../../utils/helpers.js';

const BASE_URL = 'https://bookstore.toolsqa.com';

test.describe('BookStore API - Testes de Integração', () => {
  let userData;

  test('01 - Deve criar um novo usuário com sucesso', async ({ request }) => {
    // Gerar dados dinâmicos para evitar duplicidade
    userData = {
      userName: generateRandomUsername(),
      password: generateRandomPassword()
    };

    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: userData
    });

    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody.username).toBe(userData.userName);
    expect(responseBody.userID).toBeTruthy();

    console.log(`✅ Usuário criado: ${userData.userName}`);
  });
});