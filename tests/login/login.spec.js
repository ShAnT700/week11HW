// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/LoginPage";
import { HomePage } from "../../page_objects/HomePage";
import { DashBoardPage } from "../../page_objects/DashBoardPage";
import { apiLogin } from "../../api/UserApi";

let adminEmail = "shant700@gmail.com";
let adminPassword = "123456789";

test("Should log in with existing admin account", async ({ page, request}) => {
  const homePage = new HomePage(page);
  const dashBoardPage = new DashBoardPage(page);

   await apiLogin (page, request, adminEmail, adminPassword);
  await page.goto("/");
  await homePage.dashboardButton.click();
  await expect(dashBoardPage.fullName).toHaveText(/Vitalii/);
  await expect(dashBoardPage.userRole).toContainText("admin");
});

test("Should log out", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const dashBoardPage = new DashBoardPage(page);

  await apiLogin (page, request, adminEmail, adminPassword);
  await homePage.dashboardButton.click();
  await dashBoardPage.profileLogo.click();
  await dashBoardPage.logOutBttn.click();

  await expect(loginPage.h4Title).toHaveText(/Sign in to Delek Homes/);
  await expect(page).toHaveURL("/auth/login");
});
