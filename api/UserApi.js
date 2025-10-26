import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function apiLogin(apiClient, clientEmail, clientPassword) {
  
  const loginApiResponse = await apiClient.post(`${BASE_URL}api/users/login`, {
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
  });

  const loginApiResponseJson = await loginApiResponse.json();
  return loginApiResponseJson.accessToken;
}

export async function apiLoginUi(page, apiClient, clientEmail, clientPassword ) {
  const userEmail = "shant700@gmail.com";
  const userPassword = "123456789";

  const loginApiResponse = await apiClient.post(`${BASE_URL}api/users/login`, {
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
  });

  const loginApiResponseJson = await loginApiResponse.json();
  await page.goto(BASE_URL);
  await page.evaluate((token) => localStorage.setItem("accessToken", token),loginApiResponseJson.accessToken);
  await page.goto(BASE_URL);
}
