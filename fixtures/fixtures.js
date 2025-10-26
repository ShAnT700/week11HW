import { test as base, request } from "@playwright/test";
import { apiLogin } from '../api/UserApi';
import { apiCreateListing } from "../api/ListingsApi";
// import users from '../data/users.json'

import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const test = base.extend({
  authenticatedPage: async ({ browser }, use) => {
    // Step 1: Create an API client
    const apiClient = await request.newContext();

    // Step 2: Login via API
    const token = await apiLogin(apiClient, ADMIN_EMAIL, ADMIN_PASSWORD);

    // Step 3: Create a new browser context
    const context = await browser.newContext();

    // Step 4: Inject LocalStorage token *before* any page is created
    await context.addInitScript(({ tokenValue }) => {
      window.localStorage.setItem('accessToken', tokenValue);
    }, { tokenValue: token });

    // Step 5: Create and use new page out of context above
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  createdListing: async ({}, use) => {
    // Step 1: Create an API client
    const apiClient = await request.newContext();

    // Step 2: Login via API
    const token = await apiLogin(apiClient, ADMIN_EMAIL, ADMIN_PASSWORD);
    const listing = await apiCreateListing(apiClient, token);
    console.log('createdListing fixture result:', listing);
    
    await use(listing);
    await apiClient.dispose();
  },
});