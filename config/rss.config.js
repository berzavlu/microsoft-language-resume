exports.rssFeedUrls = [
  'https://es.cointelegraph.com/rss',
  'https://www.criptonoticias.com/feed/',
  'https://decrypt.co/es/feed',
  'http://www.diariobitcoin.com/index.php/feed/',
  'https://es.beincrypto.com/news/feed/',
  'https://news.bit2me.com/feed/json',
]

exports.parserConfig = {
  headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.8'
  },
  customFields: {
      feed: [
          ['dc:publisher', 'publisher'],
          ['description', 'description'],
          ['content:encoded', 'contentEncoded'],
      ],
      item: [
          ['dc:creator', 'creator'],
          ['content:encoded', 'contentEncoded'],
          ['description', 'description'],
          ['media:content', 'media'],
          ['media:thumbnail', 'thumbnail'],
          ['enclosure', 'enclosure'],
          ['image', 'image']
      ],
  },
  defaultRSS: 2.0
};