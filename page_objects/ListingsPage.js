export class ListingsPage {
  constructor(page) {
    this.page = page;
    this.listingHeader = page.locator("h5[class='MuiTypography-root MuiTypography-h5 css-ijss57']").first();
    this.openedListingHeader = page.locator("h3[class='MuiTypography-root MuiTypography-h3 css-qp6b2n']").first();
    this.firstMoreInfoButton = page.locator(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium").first();
    this.listingPrice = page.getByText(' Asking Price:');
    this.listingLotSize = page.getByText('Lot Size');
    this.listingGarage = page.getByText('Garage');
    this.listingBathrooms = page.getByText('Bathrooms');
    this.listingSquareFeet = page.getByText('Square Feet');
    this.listingListingDate = page.getByText('Listing Date');
    this.listingBedAmount = page.getByText('Bedrooms');
    this.listingRealtor = page.getByText('Realtor:');
    this.lightModeSwitch = page.locator('[type="checkbox"]');
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole('button', { name: 'Start Search' });
    this.bedroomsCount = page.getByRole("button", { name: "Bedrooms" });
    this.badRoomsDropMenu = page.locator('[data-value="2"]');
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.lowerPriceInput = page.locator('input[data-index="0"]');
    this.higherPriceInput = page.locator('input[data-index="1"]');
  }
  async getBedroomsCount() {
    const rawText = await this.listingBedAmount.textContent();
    const count = Number(rawText?.match(/\d+/)?.[0]);
    return count;
  }
  
}
