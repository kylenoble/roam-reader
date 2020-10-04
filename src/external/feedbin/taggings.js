class Taggings {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get(`/v2/taggings.json`);
  }

  get(id) {
    return this.httpClient.get(`/v2/taggings/${id}.json`);
  }

  create(payload) {
    return this.httpClient.post(`/v2/taggings.json`, payload);
  }

  delete(id) {
    return this.httpClient.delete(`/v2/taggings/${id}.json`);
  }
}

module.exports = Taggings;
