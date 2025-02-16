const BaseSerializer = require('./BaseSerializer')

class CriptoNoticiasSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('.content-inner')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.resumen', '[class^="cript-"]', '.sugerencia-noticia', '.jeg_post_tags', '.jeg_ad'],
    }

    this._removeElements(article, elementsToRemove)

    return this._cleanText(article.textContent)
  }
}

module.exports = CriptoNoticiasSerializer
