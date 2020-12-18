const axios = require("axios").default;
const cheerio = require("cheerio");

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(`An error occurred while fetching ${url}`);
  }
};

const extractDeal = (selector) => {
  const title = selector
    .find(".responsive_search_name_combined")
    .find("div[class='col search_name ellipsis'] > span[class='title']")
    .text()
    .trim();

  const releaseDate = selector
    .find(".responsive_search_name_combined")
    .find("div[class='col search_released responsive_secondrow']")
    .text()
    .trim();

  const link = selector.attr("href").trim();

  return { title, releaseDate, link };
};

const scrapSite = async () => {
  const url =
    "https://store.steampowered.com/search/?sort_by=_ASC&filter=weeklongdeals";

  const html = await fetchHTML(url);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    "#search_result_container > #search_resultsRows > a"
  );

  const deals = searchResults
    .map((index, element) => {
      const elementSelector = selector(element);
      return extractDeal(elementSelector);
    })
    .get();

  return deals;
};

module.exports = scrapSite;
