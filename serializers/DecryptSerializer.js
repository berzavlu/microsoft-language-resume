const BaseSerializer = require('./BaseSerializer')

class DecryptSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('.post-content')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.border-decryptGridline', '.hidden', '[class^="scene:"]', '.default-creative-container', '.twitter-tweet'],
    }

    this._removeElements(article, elementsToRemove)
    this._removeParagraphsWithText(article, 'Editado por')

    return this._cleanText(article.textContent)
  }
}

module.exports = DecryptSerializer
