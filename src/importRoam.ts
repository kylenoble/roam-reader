const RoamPrivateApi = require("./external/RoamPrivateApi");
require("dotenv").config();

const api = new RoamPrivateApi(
  process.env.ROAM_DB,
  process.env.ROAM_USERNAME,
  process.env.ROAM_PASSWORD,
  {
    headless: true,
    folder: "./tmp/",
  }
);

export const importRoam = async (bookmarks: any) => {
  await api.import(bookmarks);
  console.log("export successful");
  process.exit(0);
};
