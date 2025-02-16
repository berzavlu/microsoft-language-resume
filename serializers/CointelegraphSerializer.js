const BaseSerializer = require('./BaseSerializer')

class CointelegraphSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('.post-page__content-col .post-page__item .post__content-wrapper .post-content')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.post__content-shares', '.post-content__disclaimer'],
    }

    this._removeElements(article, elementsToRemove)
    this.__removeSpanWithText(article, 'Aclaración:')

    return this._cleanText(article.textContent)
  }
}

module.exports = CointelegraphSerializer
