class Subscriptions {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAll(options) {
    return this.httpClient.get("/v2/subscriptions.json", options);
  }

  get(id) {
    return this.httpClient.get(`/v2/subscriptions/${id}.json`);
  }

  create(paylod) {
    return this.httpClient.post("/v2/subscriptions.json", payload);
  }

  update(id, payload) {
    return this.httpClient.patch(`/v2/subscriptions/${id}.json`, payload);
  }

  delete(id) {
    return this.httpClient.delete(`/v2/subscriptions/${id}.json`);
  }
}

module.exports = Subscriptions;
