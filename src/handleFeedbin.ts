const Feedbin = require("./external/feedbin/index");
const { handleBookmarks } = require("./handleBookmarks");
const { importRoam } = require("./importRoam");

require("dotenv").config();

const feedbinClient = new Feedbin(
  process.env.FEEDBIN_EMAIL,
  process.env.FEEDBIN_PASSWORD
);

export const handleFeedbin = async (debug: boolean) => {
  const feedbins = await feedbinClient.entries.getUnread();

  const feedbinBookmarks = await handleBookmarks(
    // only taking first 10 until Roam API Access
    feedbins.slice(0, 10).map((f: number) => {
      return {
        bookmark_id: f,
      };
    }),
    "feedbin",
    feedbinClient,
    debug
  );
  importRoam(feedbinBookmarks);
};
