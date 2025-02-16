const Parser = require('rss-parser')
const { AzureService } = require('./AzureService')
const ExternalDataService = require('./ExternalDataService')
const { rssFeedUrls, parserConfig } = require('../config/rss.config')
const { imageUtils } = require('../utils/imageUtils')
const { dateUtils } = require('../utils/dateUtils')
const { domainUtils } = require('../utils/domainUtils')

class FeedService {
  constructor() {
    this.parser = new Parser(parserConfig)
    this.azureService = new AzureService()
    this.externalDataService = new ExternalDataService()
  }

  async processFeeds() {
    try {
      const rawFeeds = await this.fetchMultipleFeeds()
      const processedFeeds = await this.processArticles(rawFeeds)
      const summarizedFeeds = await this.azureService.summarizeArticles(processedFeeds)
      
      // Aquí podrías agregar la lógica para guardar en base de datos
      
      return summarizedFeeds
    } catch (error) {
      console.error('Error in processFeeds:', error)
      throw error
    }
  }

  async fetchMultipleFeeds() {
      try {
        const feedPromises = rssFeedUrls.map(url => this.fetchAndParseFeed(url))
        const results = await Promise.all(feedPromises)
        
        return results
            .map(feed => this.extractTodayArticle(feed))
            .filter(Boolean)
      } catch (error) {
        console.error('Error fetching feeds:', error)
        throw error
      }
  }

  async fetchAndParseFeed(feedUrl) {
    try {
      const isJsonFeed = feedUrl.endsWith('.json') || feedUrl.includes('/json') // Ajusta según el caso
      if (isJsonFeed) {
        const response = await fetch(feedUrl)
        const text = await response.text()
        return JSON.parse(text) // Manejo de feeds JSON
      }

      return await this.parser.parseURL(feedUrl) // Manejo de feeds RSS/XML
    } catch (error) {
      console.error(`Error parsing feed from ${feedUrl}:`, error)
      return null
    }
  }

  extractTodayArticle(feed) {
    if (!feed || !feed.items) return null

    const todayArticles = feed.items.filter((item) =>
      dateUtils.isToday(new Date(item.pubDate || item.date_published))
    )

    if (!todayArticles.length) return null

    const article = todayArticles[0]
    return {
      title: article.title,
      link: article.link || article.url,
      published: article.pubDate || article.date_published,
      image: imageUtils.extractFeaturedImage(article),
      source: domainUtils.getDomainName(article.link || article.url)
    }
  }

  async processArticles(articles) {
    const processedArticles = []

    for (const article of articles) {
      const content = await this.externalDataService.getArticleContent(
        article.source,
        article.link
      )
      
      processedArticles.push({
        ...article,
        data: content
      })
    }

    return processedArticles
  }
}

module.exports = { FeedService }