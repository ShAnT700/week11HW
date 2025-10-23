import { faker } from "@faker-js/faker";
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[name="firstName"]');
    this.lastName = page.locator('[name="lastName"]');
    this.emailimput = page.locator('[name="email"]');
    this.passwordImput = page.locator('[name="password"]');
    this.submitButton = page.locator('[type="submit"]');
    this.fullUserName = page.locator("h6.css-1k96qjc");
    this.errorMessage = page.locator('[class="MuiAlert-message css-2shwac"]');
    this.errorPopup = page.locator(".MuiFormHelperText-root.Mui-error");
  }

  async registration(firstName, lastName, userEmail, password) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.emailimput.fill(userEmail);
    await this.passwordImput.fill(password);
    await this.submitButton.click();
  }
}
