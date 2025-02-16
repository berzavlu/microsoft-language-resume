const BaseSerializer = require('./BaseSerializer')

class BeIncryptoSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('.entry-content-inner')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.aff-primary', '.aff-secondary', '.aff-ternary', '.ad-wrapper'],
      ids: ['[id^="bic-c-disclimer-"]']
    }

    this._removeElements(article, elementsToRemove)
    this._removeParagraphsWithText(article, 'Leer más:')

    return this._cleanText(article.textContent)
  }
}

module.exports = BeIncryptoSerializer
