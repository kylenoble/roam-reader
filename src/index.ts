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

const getInstapaper = async () => {
  await client.login(
    process.env.INSTAPAPER_EMAIL,
    process.env.INSTAPAPER_PASSWORD
  );
  const bookMarks: any = await client.listBookmarks("unread");

  try {
    const bookMarkText = await client.getText(bookMarks[3].bookmark_id);
    var markdown = turndownService
      .turndown(bookMarkText)
      .split("\n")
      .filter((doc: string) => doc !== "")
      .map((line: string) => ({
        string: line,
      }));
    console.log(bookMarks[3]);
    createPage(bookMarks[3], markdown, "instapaper");
  } catch (err) {
    console.log("err getting text");
    console.log(err);
  }
};

//// Build Import Array ////
// Open File

// Get array of pages

// append to array of pages

// save file

const getFeedbin = async () => {
  const feedbin = new Feedbin(
    process.env.FEEDBIN_EMAIL,
    process.env.FEEDBIN_PASSWORD
  );

  const feedbins = await feedbin.entries.getUnread();

  console.log(feedbins);
};

// Parse Text

const createPage = async (article: any, text: any, tag: string) => {
  var utcSeconds = article.time;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);

  // console.log(text);
  // api.import([
  //   {
  //     title: `${article.title}`,
  //     children: [
  //       { string: `url:: ${article.url}` },
  //       { string: `date:: ${d}` },
  //       { string: "read:: {{[[TODO]]}}" },
  //       { string: "tags:: ", children: [{ string: `#to-read #${tag}`  }] },
  //       { string: "notes:: ", children: [{ string: "" }] },
  //       { string: "text::", children: text },
  //     ],
  //   },
  // ]);
};

getInstapaper();
