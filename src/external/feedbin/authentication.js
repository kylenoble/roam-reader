class Authentication {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  get() {
    return this.httpClient.get("/v2/authentication.json");
  }
}

module.exports = Authentication;
