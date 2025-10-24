export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailimput = page.locator('[name="email"]');
    this.passwordImput = page.locator('[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
    this.h4Title = page.locator("h4");
  }

  async login(email, password) {
    const loginApiResponse = await request.post(`/api/users/login`, {
      data: {
        email: email,
        password: password,
      },
    });
  }
}
