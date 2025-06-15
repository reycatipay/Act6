const newsURL = [
  {
    name: 'GMA News',
    url: 'https://www.gmanetwork.com/news/',
    baseUrl: 'https://www.gmanetwork.com',
    selectors: {
      headlines: 'h1.content-item__title',
      link: 'a.content-item__link', // Extract href
      author: 'span.content-item__author', 
      date: 'time.content-item__time', // <time datetime="...">
    },
  },
  {
    name: 'CNN Philippines',
    url: 'https://edition.cnn.com/world/asia',
    baseUrl: 'https://www.cnnphilippines.com/',
    selectors: {
      headlines: 'h2.news-title',
      link: 'a.news-link', // Extract href
      author: 'span.news-author',
      date: 'time.news-date', // <time datetime="...">
    },
  },
  {
  name: 'Scrape This Site - Countries',
  url: 'https://www.scrapethissite.com/pages/simple/',
  baseUrl: 'https://www.scrapethissite.com',
  selectors: {
    headlines: '.page-title'
  }},
  {
  name: 'NPR News',
  url: 'https://www.npr.org/sections/news/',
  baseUrl: 'https://www.npr.org',
  selectors: {
    headlines: 'article.item h2.title',
    link: 'a',                            // inside the <h2>
    author: '.byline .name',              // author name
    date: '.byline time',                 // <time datetime="">
  }}
];

module.exports = newsURL;