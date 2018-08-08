// set dates of pages to launch date
// reference images for each page
sitemaps.add('/sitemap.xml', function() {
  // required: page
  // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
  // last modified date should be the date we go into production
  return [
    { page: '/', lastmod: new Date(), priority: 1.0 },
    { page: '/shop', lastmod: new Date(), priority: 0.9 },
    { page: '/contact', lastmod: new Date(), priority: 0.8 }];
});
