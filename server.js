require('dotenv').config()
const express = require('express')
const cron = require('node-cron')
const { FeedService } = require('./services/FeedService')

const app = express()
const PORT = process.env.PORT || 3000

// Instancia del servicio
const feedService = new FeedService()

// Endpoint GET para obtener noticias
app.get('/api/news', async (req, res) => {
  try {
    const news = await feedService.processFeeds()
    res.json(news)
  } catch (error) {
    console.error('Error processing feeds:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Programar tarea cada 4 horas
cron.schedule('0 14-4/1 * * *', async () => {
  try {
    const date = new Date()
    console.log('Running scheduled feed processing...' + date.toISOString())
    await feedService.processFeeds()
    console.log('Feed processing completed successfully')
  } catch (error) {
    console.error('Error in scheduled feed processing:', error)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
