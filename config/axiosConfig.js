require('dotenv').config()
const axios = require('axios')
const https = require('https')

class AxiosConfig {
  static create() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    return axios.create({
      maxRedirects: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      proxy: {
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        auth: {
          username: process.env.PROXY_USER,
          password: process.env.PROXY_PASS,
        },
      },
      httpsAgent: agent
    })
  }
}

module.exports = AxiosConfig
