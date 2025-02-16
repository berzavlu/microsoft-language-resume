require('dotenv').config()
exports.azureConfig = {
  endpoint: process.env.AZURE_ENDOINT,
  apiKey: process.env.AZURE_API_KEY
}
