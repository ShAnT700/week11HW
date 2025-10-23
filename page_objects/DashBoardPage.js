export class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.fullName = page.locator("h6.css-1k96qjc");
    this.userRole = page.locator("p.css-10n697b");
    this.profileLogo = page.locator('header .css-1hy9t21');
    this.logOutBttn = page.locator('li.css-p9n58v');
    
  }
}
