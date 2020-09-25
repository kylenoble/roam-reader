const Instapaper = require("./external/Instapaper");
const RoamPrivateApi = require("./external/RoamPrivateApi");
const Feedbin = require("feedbin-nodejs");
var TurndownService = require("turndown");
require("dotenv").config();

const api = new RoamPrivateApi(
  "Kyledb",
  process.env.ROAM_USERNAME,
  process.env.ROAM_PASSWORD,
  {
    headless: false,
    folder: "./tmp/",
  }
);

const client = new Instapaper(
  process.env.INSTAPAPER_KEY,
  process.env.INSTAPAPER_SECRET
);

var turndownService = new TurndownService();

const handleInstaBookmarks = async (bookmarks: any, tag: string) => {
  const pages: any = [];
  for (const bookmark of bookmarks) {
    try {
      var utcSeconds = bookmark.time;
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(utcSeconds);

      const bookMarkText = await client.getText(bookmark.bookmark_id);
      var markdown = turndownService
        .turndown(bookMarkText)
        .split("\n")
        .filter((doc: string) => doc !== "")
        .map((line: string) => ({
          string: line,
        }));
      pages.push({
        title: `${bookmark.title}`,
        children: [
          { string: `url:: ${bookmark.url}` },
          { string: `date:: ${d}` },
          { string: "read:: {{[[TODO]]}}" },
          { string: "tags:: ", children: [{ string: `#to-read #${tag}` }] },
          { string: "notes:: ", children: [{ string: "" }] },
          { string: "text::", children: markdown },
        ],
      });
      await client.archiveBookmark(bookmark.bookmark_id);
    } catch (err) {
      console.log("err getting text");
      console.log(err);
    }
  }

  return pages;
};

const getInstapaper = async () => {
  await client.login(
    process.env.INSTAPAPER_EMAIL,
    process.env.INSTAPAPER_PASSWORD
  );
  const bookMarks: any = await client.listBookmarks("unread");

  const instaBookmarks = await handleInstaBookmarks(
    bookMarks.filter((b: any) => b.bookmark_id > 0),
    "instapaper"
  );
  createPage(instaBookmarks);
};

const getFeedbin = async () => {
  const feedbin = new Feedbin(
    process.env.FEEDBIN_EMAIL,
    process.env.FEEDBIN_PASSWORD
  );

  const feedbins = await feedbin.entries.getUnread();

  console.log(feedbins);
};

const createPage = async (bookmarks: any) => {
  api.import(bookmarks);
};

getInstapaper();
