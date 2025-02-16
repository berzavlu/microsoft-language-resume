const { TextAnalysisClient, AzureKeyCredential } = require('@azure/ai-language-text')
const { azureConfig } = require('../config/azure.config')

class AzureService {
  constructor() {
    this.client = new TextAnalysisClient(
      azureConfig.endpoint,
      new AzureKeyCredential(azureConfig.apiKey)
    )
  }

  async summarizeArticles(articles) {
    try {
      const { documents, idMapping } = this.prepareDocuments(articles)
      
      const actions = [{
        kind: 'AbstractiveSummarization',
        maxSentenceCount: 1,
        orderBy: 'Rank'
      }]

      const poller = await this.client.beginAnalyzeBatch(actions, documents, 'es')
      const results = await poller.pollUntilDone()
      
      return this.processSummaryResults(articles, results, idMapping)
    } catch (error) {
      console.error('Error in summarizeArticles:', error)
      throw error
    }
  }

  prepareDocuments(articles) {
    const idMapping = new Map()
    
    const documents = articles.map((article, index) => {
      const id = `doc_${index}`  // ID simplificado y estático
      idMapping.set(id, index)    // Guardar la relación ID -> índice
      
      return {
        id,
        language: 'es',
        text: `${article.title}. ${article.data}`
      }
    })

    return { documents, idMapping }
  }

  async processSummaryResults(articles, results, idMapping) {
    const summaries = new Map()

    for await (const actionResult of results) {
      if (actionResult.kind !== 'AbstractiveSummarization') {
        throw new Error(`Unexpected result kind: ${actionResult.kind}`)
      }

      for (const result of actionResult.results) {
        if (result.error) {
          console.error(`Azure Error for document ${result.id}:`, result.error)
          continue  // Continuar con el siguiente resultado en caso de error
        }

        const summary = result.summaries[0]?.text || ''
        summaries.set(result.id, summary)
      }
    }

    return articles.map((article, index) => {
      const documentId = `doc_${index}`
      return {
        title: article.title,
        link: article.link,
        published: article.published,
        image: article.image,
        source: article.source,
        resume: summaries.get(documentId) || ''
      }
    })
  }
}

module.exports = { AzureService }
