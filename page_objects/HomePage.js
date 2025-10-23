export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('[href="/auth/login"]');
    this.registerButton = page.locator('[href="/auth/register"]');
    this.lightModeSwitch = page.locator('[type="checkbox"]');
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.bedroomsCount = page.getByRole("button", { name: "Bedrooms" });
    this.badRoomsDropMenu2 = page.locator('[data-value="2"]');
    this.searchButton = page.locator('[type="button"]');
    this.registerButton = page.locator('[href="/auth/register"]');
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.lowerPriceInput = page.locator('input[data-index="0"]');
    this.higherPriceInput = page.locator('input[data-index="1"]');
    this.featuredListingsButton = page.getByRole("link", { name: "Featured listings" });
    this.dashboardButton = page.getByRole("link", { name: "Dashboard" });


  }
}
