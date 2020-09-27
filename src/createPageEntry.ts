var TurndownService = require("turndown");
var turndownService = new TurndownService();

module.exports = (
  title: string,
  url: string,
  date: Date,
  tag: string,
  content: string,
  author?: string,
  debug?: boolean
) => {
  if (!content) {
    return false;
  }

  let markdown;
  try {
    markdown = turndownService
      .turndown(content)
      .split("\n")
      .filter((doc: string) => doc !== "")
      .map((line: string) => ({
        string: line,
      }));
  } catch (err) {
    console.log(`error parsing ${url} - ${title}`);
    if (debug) {
      console.log(err);
    }

    return false;
  }

  return {
    title: `${title}`,
    children: [
      { string: `url:: ${url}` },
      { string: `date:: ${date}` },
      { string: `author:: ${author || ""}` },
      { string: "read:: {{[[TODO]]}}" },
      { string: `tags:: #to-read #${tag}` },
      { string: "summary:: ", children: [{ string: "" }] },
      { string: "ideas:: ", children: [{ string: "" }] },
      { string: "scribbles:: ", children: [{ string: "" }] },
      { string: "text::", children: markdown },
    ],
  };
};
