class Entries {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAll(options) {
    return this.httpClient.get(`/v2/entries.json`, options);
  }

  get(id) {
    return this.httpClient.get(`/v2/entries/${id}.json`);
  }

  getUnread() {
    return this.httpClient.get(`/v2/unread_entries.json`);
  }

  markAsRead(ids) {
    return this.httpClient.post(`/v2/unread_entries/delete.json`, {
      unread_entries: ids,
    });
  }

  getStarred() {
    return this.httpClient.get(`/v2/starred_entries.json`);
  }

  unstar(ids) {
    return this.httpClient.delete(`/v2/starred_entries.json`, {
      starred_entries: ids,
    });
  }

  getUpdated() {
    return this.httpClient.get(`/v2/updated_entries.json`);
  }

  markUpdatedAsRead(ids) {
    return this.httpClient.delete(`/v2/updated_entries.json`, {
      updated_entries: ids,
    });
  }
}

module.exports = Entries;
