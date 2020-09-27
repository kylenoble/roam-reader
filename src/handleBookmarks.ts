const createPageEntry = require("./createPageEntry");
const sleep = require("./utils/sleep");

export const handleBookmarks = async (
  bookmarks: any,
  type: string,
  client: any,
  debug: boolean
) => {
  const pages: any = [];
  let i = 0;
  for (const bookmark of bookmarks) {
    console.log(`${type} - ${bookmark.bookmark_id}`);
    if (i % 10 === 0) {
      await sleep(1000);
    }
    try {
      let bookMarkText;
      let bookmarkDate;
      let updatedBookmark;
      if (type === "instapaper") {
        var utcSeconds = bookmark.time;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        bookmarkDate = d;
        try {
          bookMarkText = await client.getText(bookmark.bookmark_id);
          updatedBookmark = bookmark;
        } catch (err) {
          if (debug) {
            console.log(err);
          }
          console.log(
            `error getting ${bookmark.url} - ${bookmark.bookmark_id}`
          );
        }
      } else if (type === "feedbin") {
        try {
          updatedBookmark = await client.entries.get(bookmark.bookmark_id);
          bookMarkText = updatedBookmark.content;
        } catch (err) {
          if (debug) {
            console.log(err);
          }
          console.log(`error getting ${bookmark.url}`);
        }
        bookmarkDate = updatedBookmark.published;
      }

      const createdPage = createPageEntry(
        updatedBookmark.title,
        updatedBookmark.url,
        bookmarkDate,
        type,
        bookMarkText,
        updatedBookmark.author,
        debug
      );

      if (createdPage) {
        pages.push(createdPage);
        if (type === "instapaper") {
          await client.archiveBookmark(bookmark.bookmark_id);
        } else if (type === "feedbin") {
          await client.entries.markAsRead([bookmark.bookmark_id]);
        }
      }
    } catch (err) {
      console.log("err getting text");
      console.log(err);
    }

    i++;
  }

  return pages;
};
