import { handleInstapaper } from "./handleInstapaper";
import { handleFeedbin } from "./handleFeedbin";

let debug = false;

const [, , ...args] = process.argv;

if (args.indexOf("-t") !== -1) {
  debug = true;
}

if (args.indexOf("instapaper") !== -1) {
  console.log("getting instapaper...");
  handleInstapaper(debug);
}

if (args.indexOf("feedbin") !== -1) {
  console.log("getting feedbin...");
  handleFeedbin(debug);
}
