import { test, expect } from '@playwright/test';
import { TestData } from '../fixtures/TestData';

test('SIGN-001 - User can successfully sign up with valid data', async ({ page }) => {
  const data = new TestData('SIGN-001');

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');

  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByLabel('Confirm Password').fill(data.password);

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/login.html', { timeout: 10000 });
});

test('SIGN-002 - Negative test - username is empty', async({ page }) => {
  const data = new TestData('SIGN-002');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByLabel('Confirm Password').fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-003 - Negative test - email is empty', async ({ page }) => {
  const data = new TestData('SIGN-003');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByLabel('Confirm Password').fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-004 - Negative test - password is empty', async ({ page }) => {
  const data = new TestData('SIGN-004');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Confirm Password').fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-005 - Negative test - confirm password is empty', async ({ page }) => {
  const data = new TestData('SIGN-005');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-006 - Negative test - all fields are empty', async ({ page }) => {
  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-007 - Negative test - invalid email format', async ({ page }) => {
  const data = new TestData('SIGN-007');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Email').fill('invalid-email-format');
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByLabel('Confirm Password').fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});

test('SIGN-008 - Negative test - email missing @ symbol', async ({ page }) => {
  const data = new TestData('SIGN-008');

  await page.goto('http://localhost/mini_ecommerce/static/signup.html');
  await expect(page).toHaveTitle('Sign Up — MiniShop');
  await page.getByLabel('Username').fill(data.username);
  await page.getByLabel('Email').fill('invalid-email-format');
  await page.getByLabel('Password', { exact: true }).fill(data.password);
  await page.getByLabel('Confirm Password').fill(data.password);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL('http://localhost/mini_ecommerce/static/signup.html');
});
