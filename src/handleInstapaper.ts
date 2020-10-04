const Instapaper = require("./external/Instapaper");
import { handleBookmarks } from "./handleBookmarks";
import { importRoam } from "./importRoam";

require("dotenv").config();

const client = new Instapaper(
  process.env.INSTAPAPER_KEY,
  process.env.INSTAPAPER_SECRET
);

export const handleInstapaper = async (debug: boolean) => {
  await client.login(
    process.env.INSTAPAPER_EMAIL,
    process.env.INSTAPAPER_PASSWORD
  );
  const bookMarks: any = await client.listBookmarks("unread");

  const instaBookmarks = await handleBookmarks(
    // only taking first 10 until Roam API Access
    bookMarks.slice(0, 10).filter((b: any) => b.bookmark_id > 0),
    "instapaper",
    client,
    debug
  );
  importRoam(instaBookmarks);
};
