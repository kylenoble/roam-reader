const axios = require("axios");

const Authentication = require("./authentication");
const Entries = require("./entries");
const Feeds = require("./feeds");
const Subscriptions = require("./subscriptions");
const Taggings = require("./taggings");

const FEEDBIN_HOST = "https://api.feedbin.com";

class Feedbin {
  constructor(username, password, feedbinHost = FEEDBIN_HOST) {
    let credentials = {
      username,
      password,
    };

    let httpClient = axios.create({
      baseURL: feedbinHost,
      auth: credentials,
    });

    httpClient.interceptors.response.use(
      function (response) {
        return Promise.resolve(response.data);
      },
      function (err) {
        return Promise.reject(err);
      }
    );

    this.authentication = new Authentication(httpClient);
    this.entries = new Entries(httpClient);
    this.feeds = new Feeds(httpClient);
    this.subscriptions = new Subscriptions(httpClient);
    this.taggings = new Taggings(httpClient);
  }
}

module.exports = Feedbin;
