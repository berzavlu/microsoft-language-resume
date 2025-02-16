const { parse } = require('node-html-parser')
const AxiosConfig = require('../config/axiosConfig')
const BeIncryptoSerializer = require('../serializers/BeIncryptoSerializer')
const CointelegraphSerializer = require('../serializers/CointelegraphSerializer')
const CriptoNoticiasSerializer = require('../serializers/CriptoNoticiasSerializer')
const DecryptSerializer = require('../serializers/DecryptSerializer')
const DiarioBitcoinSerializer = require('../serializers/DiarioBitcoinSerializer')
const Bit2meSerializer = require('../serializers/Bit2meSerializer')

class ExternalDataService {
  constructor() {
    this.axiosInstance = AxiosConfig.create()
    this.serializers = {
      beincrypto: new BeIncryptoSerializer(),
      cointelegraph: new CointelegraphSerializer(),
      criptonoticias: new CriptoNoticiasSerializer(),
      decrypt: new DecryptSerializer(),
      diariobitcoin: new DiarioBitcoinSerializer(),
      bit2me: new Bit2meSerializer()
    }
  }

  async fetchData(url, siteName) {
    try {
      const { data } = await this.axiosInstance.get(url)
      const root = parse(data)
      
      const serializer = this.serializers[siteName]
      if (!serializer) {
        throw new Error(`No hay serializer definido para ${siteName}`)
      }

      return serializer.serialize(root)
    } catch (error) {
      console.error(`Error al procesar ${siteName}:`, error)
      return false
    }
  }

  async beincrypto(url) {
    return this.fetchData(url, 'beincrypto')
  }

  async cointelegraph(url) {
    return this.fetchData(url, 'cointelegraph')
  }

  async criptonoticias(url) {
    return this.fetchData(url, 'criptonoticias')
  }

  async decrypt(url) {
    return this.fetchData(url, 'decrypt')
  }

  async diariobitcoin(url) {
    return this.fetchData(url, 'diariobitcoin')
  }

  async bit2me(url) {
    return this.fetchData(url, 'bit2me')
  }

  async getArticleContent(name, url) {
    try {
      return this[name](url)
    } catch (error) {
      console.error(`Error en getArticleContent para ${name}:`, error)
      return false
    }
  }
}

module.exports = ExternalDataService