class SavedSearches {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAll() {
    return this.httpClient.get(`/v2/saved_searches.json`);
  }

  get(id, options) {
    return this.httpClient.get(`/v2/saved_searches/${id}.json`, options);
  }

  create(payload) {
    return this.httpClient.post(`/v2/saved_searches.json`, payload);
  }

  update(id, payload) {
    return this.httpClient.patch(`/v2/saved_searches/${id}.json`, payload);
  }

  delete(id) {
    return this.httpClient.delete(`/v2/saved_searches/${id}.json`);
  }
}

module.exports = SavedSearches;
