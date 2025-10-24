import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { test, expect } from "@playwright/test";

export async function apiLogin(...args) {
    
  let apiUrl, page, apiClient, email, password ;
   
  if (args.length === 5) {
    [apiClient, email, password, apiUrl, baseUrl] = args;
  } else if (args.length === 6) {
    [page, apiClient, email, password, apiUrl, baseUrl] = args;
  } else {
    throw new Error('apiLogin should be called as apiLogin(apiClient, email, password) or apiLogin(page, apiClient, email, password)');
  }
  if (!apiClient?.post || typeof apiClient.post !== 'function') {
    throw new Error('apiClient should be Playwright APIRequestContext');
  }

  const loginApiResponse = await apiClient.post(apiUrl, baseUrl, {
    data: {
      email,
      password,
    },
  });

  const loginApiResponseJson = await loginApiResponse.json();
  const token = loginApiResponseJson.accessToken;

  if (page) {
    await page.goto(baseURL);
    await page.evaluate((tokenValue) => {window.localStorage.setItem('accessToken', tokenValue);}, token);
    await page.reload();
  }
  return token;
}
