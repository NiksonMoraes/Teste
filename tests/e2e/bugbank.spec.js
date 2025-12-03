// tests/e2e/bugbank.spec.js
import { test, expect } from '@playwright/test';
import { generateRandomEmail } from '../../utils/helpers.js';

const SENHA_FIXA = 'Qa@123456';

test.describe.serial('Desafio 2 – BugBank E2E', () => {

  test('01 - Cadastro com sucesso e conta com saldo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Registrar' }).click();

    const email = generateRandomEmail();
    const nome = `Aluno ${Date.now()}`;

    await page.fill('input[name = "email"]', email);
    await page.fill('input[name = "nome"]', nome);
    await page.fill('input[name = "password"]', SENHA_FIXA);
    await page.fill('input[name = "passwordConfirmation"]', SENHA_FIXA);

    await page.getByRole('switch').check(); // switch de saldo
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const modal = page.locator('#modalText');
        await expect(modal).toContainText(/foi criada com sucesso/i);
        await page.locator('#btnCloseModal').click();
  });

  test('02 - Login e validação de saldo', async ({ page }) => {
    const email = generateRandomEmail();
    const nome = `Aluno ${Date.now()}`;

    // === CADASTRO ===
    await page.goto('/');
    await page.getByRole('button', { name: 'Registrar' }).click();
    await page.getByPlaceholder('nome@exemplo.com').fill(email);
    await page.getByPlaceholder('Seu nome').fill(nome);
    await page.getByPlaceholder('Escolha uma senha').fill(SENHA_FIXA);
    await page.getByPlaceholder('Repita a senha').fill(SENHA_FIXA);
    await page.getByRole('switch').check();
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('button', { name: 'Fechar' }).click();

    // === LOGIN ===
    await page.getByPlaceholder('nome@exemplo.com').first().fill(email);
    await page.getByPlaceholder('Escolha uma senha').first().fill(SENHA_FIXA);
    await page.getByRole('button', { name: 'Acessar' }).click();

    await expect(page.getByText(nome)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('R$ 1.000,00')).toBeVisible();
  });

  test('03 - Transferência para conta inválida', async ({ page }) => {
    const email = generateRandomEmail();

    // Cadastro + Login (reaproveita o fluxo acima)
    await page.goto('/');
    await page.getByRole('button', { name: 'Registrar' }).click();
    await page.getByPlaceholder('nome@exemplo.com').fill(email);
    await page.getByPlaceholder('Seu nome').fill('Teste Transferência');
    await page.getByPlaceholder('Escolha uma senha').fill(SENHA_FIXA);
    await page.getByPlaceholder('Repita a senha').fill(SENHA_FIXA);
    await page.getByRole('switch').check();
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('button', { name: 'Fechar' }).click();

    await page.getByPlaceholder('nome@exemplo.com').first().fill(email);
    await page.getByPlaceholder('Escolha uma senha').first().fill(SENHA_FIXA);
    await page.getByRole('button', { name: 'Acessar' }).click();

    await page.getByRole('button', { name: 'Transferência' }).click();
    await page.getByLabel('Número da conta').fill('999999');
    await page.getByLabel('Dígito').fill('9');
    await page.getByLabel('Valor da transferência').fill('50');
    await page.getByRole('button', { name: 'Transferir agora' }).click();

    await expect(page.getByText('Conta inválida ou inexistente')).toBeVisible({ timeout: 10000 });
  });
});