const puppeteer = require("puppeteer");
const fs = require("fs");
const os = require("os");

class RoamPrivateApi {
  options;
  browser;
  page;
  db;
  login;
  pass;

  constructor(
    db,
    login,
    pass,
    options = { headless: true, folder: null, nodownload: false }
  ) {
    this.db = db;
    this.login = login;
    this.pass = pass;
    this.options = options;
    // If you dont pass folder option, we will use the system tmp directory.
    if (!options.folder) {
      options.folder = os.tmpdir();
    }
  }

  /**
   * Logs in to Roam interface.
   */
  async logIn() {
    if (this.browser) {
      return this.browser;
    }
    this.browser = await puppeteer.launch(this.options);
    try {
      this.page = await this.browser.newPage();
      await this.page.goto("https://roamresearch.com/#/app/" + this.db);
      await this.page.waitForNavigation();
      await this.page.waitForSelector("input[name=email]");
    } catch (e) {
      console.error("Cannot load the login screen!");
      throw e;
    }
    // Login
    await this.page.type("input[name=email]", this.login);
    await this.page.type("input[name=password]", this.pass);
    await this.page.click(".bp3-button");
    await this.page.waitForSelector(".bp3-icon-more");
    return;
  }

  async import(items = []) {
    const fileName =
      this.options.folder + "roam-research-private-api-sync.json";
    fs.writeFileSync(fileName, JSON.stringify(items));
    await this.logIn();
    await this.page.waitForSelector(".bp3-icon-more");
    await this.clickMenuItem("Import Files");

    await this.page.waitForSelector("input[type=file]");
    await this.page.waitFor(1000);
    // get the ElementHandle of the selector above
    const inputUploadHandle = await this.page.$("input[type=file]");

    // Sets the value of the file input to fileToUpload
    inputUploadHandle.uploadFile(fileName);
    await this.page.waitForSelector(".bp3-dialog .bp3-intent-primary");
    await this.page.click(".bp3-dialog .bp3-intent-primary");
    await this.page.waitFor(3000);
    return;
  }

  async clickMenuItem(title) {
    await this.page.click(".bp3-icon-more");

    await this.page.waitForSelector(".bp3-menu li a");

    const items = [...(await this.page.$$(".bp3-menu li a"))];
    console.log(items);
    items.forEach((item, i) => {
      if (i === 4) {
        item.click();
        return;
      }
    });
  }

  async close() {
    if (this.browser) {
      await this.page.waitFor(1000);
      await this.browser.close();
      this.browser = null;
    }
    return;
  }
}

module.exports = RoamPrivateApi;
