const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8080;

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

app.get("/scrape", async (req, res) => {
  const query = req.query.url;
  const headlineLinksSet = new Set();
  const limitNews = 10;

  try {
    const response = await axios.get(query, { headers });
    const $ = cheerio.load(response.data);

    // CNN selectors
    $(".container__link, .story_link, .latest_section_stories_content").each((_, element) => {
      if (headlineLinksSet.size >= limitNews) return false;
      let url = $(element).attr("href");
      if (url && !url.startsWith("http")) {
        url = new URL(url, query).href;
      }
      headlineLinksSet.add(url);
    });

    // GMA News selectors (only works if content is statically available)
    $("a.featured-article__title, a.article-list__title").each((_, element) => {
      if (headlineLinksSet.size >= limitNews) return false;
      let url = $(element).attr("href");
      if (url && !url.startsWith("http")) {
        url = new URL(url, query).href;
      }
      headlineLinksSet.add(url);
    });

    const headlineLinks = Array.from(headlineLinksSet);
    const results = [];

    for (const link of headlineLinks) {
      let article;
      if (link.includes("gmanetwork.com")) {
        article = await scrapeGMA(link);
      } else if (link.includes("cnn")) {
        article = await scrapeCNN(link);
      } else {
        continue; // skip unsupported
      }

      if (article) results.push(article);
    }

    res.json({ news: results });
  } catch (err) {
    console.error("Failed!", err.message);
    res.status(500).send("Error occurred while scraping.");
  }
});

async function scrapeCNN(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);

    const headline = $("meta[property='og:title']").attr("content")?.trim() || "Unavailable";
    const author = $("meta[name='author']").attr("content")?.trim() || "Anonymous";
    const pubDate = $("meta[property='og:pubdate'], meta[property='article:published_time']").attr("content")?.trim() || "Unavailable";

    return { headline, author, pubDate, url };
  } catch (err) {
    console.error(`Error scraping CNN:`, err.message);
    return null;
  }
}

async function scrapeGMA(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);

    const headline = $("meta[property='og:title']").attr("content")?.trim()
      || $("h1").first().text().trim()
      || "Unavailable";

    const author = $(".author__name").text().trim()
      || $("meta[name='author']").attr("content")?.trim()
      || "Anonymous";

    const pubDate = $("meta[property='article:published_time']").attr("content")?.trim()
      || $("meta[name='pubdate']").attr("content")?.trim()
      || "Unavailable";

    return { headline, author, pubDate, url };
  } catch (err) {
    console.error(`Error scraping GMA:`, err.message);
    return null;
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
