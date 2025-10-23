export async function apiLogin(page,apiClient, clientEmail, clientPassword) {
  
  const loginApiResponse = await apiClient.post(`/api/users/login`, {
    data: {
      email: clientEmail,
      password: clientPassword,
    },
  });

  const loginApiResponseJson = await loginApiResponse.json();
  await page.goto("/");
  await page.evaluate((token) => localStorage.setItem("accessToken", token),loginApiResponseJson.accessToken);
  await page.goto("/");
}
