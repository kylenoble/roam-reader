class Feeds {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  get(id) {
    return this.httpClient.get(`/v2/feeds/${id}.json`);
  }
}

module.exports = Feeds;
