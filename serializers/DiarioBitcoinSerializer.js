const BaseSerializer = require('./BaseSerializer')

class DiarioBitcoinSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('.entry-content')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.twitter-tweet', '.disclaimer-presale'],
    }

    this._removeElements(article, elementsToRemove)
    this._removeLinksWithText(article, 'Patrocinador')
    this._removeParagraphsWithText(article, 'Leer más:')
    this._removeParagraphsWithText(article, 'Imagen de')
    this._removeParagraphsWithText(article, 'Artículo de')
    this._removeParagraphsWithText(article, 'Descargo de responsabilidad:')
    this._removeParagraphsWithText(article, 'ADVERTENCIA:')

    return this._cleanText(article.textContent)
  }
}

module.exports = DiarioBitcoinSerializer
