// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/LoginPage";
import { HomePage } from "../../page_objects/HomePage";
import { DashBoardPage } from "../../page_objects/DashBoardPage";
// import { apiLogin } from "../../api/UserApi";


test("Should log in with existing admin account", async ({ page }, testInfo) => {
   
  const homePage = new HomePage(page);
  const dashBoardPage = new DashBoardPage(page);
  const loginPage = new LoginPage(page);

  let baseUrl = testInfo.project.use.env.baseUrl;
  let adminEmail = testInfo.project.use.env.adminEmail;
  let adminPassword = testInfo.project.use.env.adminPassword

  await page.goto(baseUrl);
  await homePage.loginButton.click();
  await loginPage.emailimput.fill(adminEmail);
  await loginPage.passwordImput.fill(adminPassword);
  await loginPage.loginButton.click();

  await expect(dashBoardPage.fullName).toHaveText(/Vitalii/);
  await expect(dashBoardPage.userRole).toContainText("admin");
});

test("Should log out", async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const dashBoardPage = new DashBoardPage(page);
  
  let baseUrl = testInfo.project.use.env.baseUrl;
  let adminEmail = testInfo.project.use.env.adminEmail;
  let adminPassword = testInfo.project.use.env.adminPassword;
    
  await page.goto(baseUrl);
  await homePage.loginButton.click();
  await loginPage.emailimput.fill(adminEmail);
  await loginPage.passwordImput.fill(adminPassword);
  await loginPage.loginButton.click();

  await homePage.dashboardButton.click();
  await dashBoardPage.profileLogo.click();
  await dashBoardPage.logOutBttn.click();

  await expect(loginPage.h4Title).toHaveText(/Sign in to Delek Homes/);
  await expect(page).toHaveURL(`${baseUrl}auth/login`);
});
