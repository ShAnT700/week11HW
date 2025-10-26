import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";
import { HomePage } from "../../page_objects/HomePage";
import { ListingsPage } from "../../page_objects/ListingsPage";
import { LoginPage } from "../../page_objects/LoginPage";

let homePage;
let listingsPage;
let loginPage;
let sharedListing;

test.describe("Search - Home Page", () => {

  test.beforeAll(async ({ createdListing }) => {
    sharedListing = createdListing;
  });

  test.beforeEach(async ({ authenticatedPage }) => {
    homePage = new HomePage(authenticatedPage);
    listingsPage = new ListingsPage(authenticatedPage);
    loginPage = new LoginPage(authenticatedPage);
  });

  test("Should search by keyword", async ({ authenticatedPage }, testInfo) => {


  let baseUrl = testInfo.project.use.env.baseUrl;

  await authenticatedPage.goto(baseUrl);
  await homePage.lightModeSwitch.check();
  await homePage.searchInput.fill(sharedListing.title);
  await homePage.searchButton.click();
  
  await expect(listingsPage.listingHeader).toHaveText(sharedListing.title);
  await expect(listingsPage.listingHeader).toBeVisible();
  });

  test("Should search by bedrooms", async ({ authenticatedPage}, testInfo) => {

    let baseUrl = testInfo.project.use.env.baseUrl;

    await authenticatedPage.goto(baseUrl);
    await homePage.lightModeSwitch.check();
    await homePage.bedroomsCount.click();
    await homePage.badRoomsDropMenu2.click();
    await homePage.searchButton.click();
    await listingsPage.firstMoreInfoButton.click();

    await expect(listingsPage.listingBedAmount).toBeVisible();

    const bedroomCount = await listingsPage.getBedroomsCount();
    expect(bedroomCount).toBeGreaterThanOrEqual(2);
  });

  test("Should search by city", async ({ authenticatedPage }, testInfo) => {
   
  let baseUrl = testInfo.project.use.env.baseUrl;

  await authenticatedPage.goto(baseUrl);
  await homePage.lightModeSwitch.check();
  await homePage.cityInput.fill(sharedListing.city);
  await homePage.searchButton.click();
  await listingsPage.firstMoreInfoButton.click();

  await expect(listingsPage.openedListingHeader).toBeVisible();
  await expect(listingsPage.listingPrice).toBeVisible();
  await expect(listingsPage.listingLotSize).toBeVisible();
  await expect(listingsPage.listingGarage).toBeVisible();
  await expect(listingsPage.listingBathrooms).toBeVisible();
  await expect(listingsPage.listingSquareFeet).toBeVisible();
  await expect(listingsPage.listingListingDate).toBeVisible();
  await expect(listingsPage.listingBedAmount).toBeVisible();
  await expect(listingsPage.listingRealtor).toBeVisible();
  });

  test("Should search by price", async ({ authenticatedPage }, testInfo) => {
    const minPrice = "600000";
    const maxPrice = "700000";
    const numericMinPrice = parseInt(minPrice, 10);
    const numericMaxPrice = parseInt(maxPrice, 10);
    let baseUrl = testInfo.project.use.env.baseUrl;

    await authenticatedPage.goto(baseUrl);
    await homePage.lightModeSwitch.check();
    await homePage.lowerPriceInput.fill(minPrice);
    await homePage.higherPriceInput.fill(maxPrice);
    await homePage.searchButton.click();
    await listingsPage.firstMoreInfoButton.click();

    await expect(listingsPage.listingPrice).toBeVisible();

    const rawText = await listingsPage.listingPrice.textContent();
    const digitPrice = parseInt(rawText.replace(/[^\d]/g, ""), 10);

    await expect(digitPrice).toBeGreaterThanOrEqual(numericMinPrice);
    await expect(digitPrice).toBeLessThanOrEqual(numericMaxPrice);
  });
});
