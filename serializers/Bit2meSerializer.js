const BaseSerializer = require('./BaseSerializer')

class Bit2meSerializer extends BaseSerializer {
  serialize(root) {
    const article = root.querySelector('[id^="post-"] .td-post-content')
    if (!article) return null

    const elementsToRemove = {
      tags: ['script', 'style', 'img', 'picture', 'figure', 'iframe'],
      classes: ['.td-post-featured-image', '.text-link-data-deeplink', '.banner-tofu-courses'],
    }

    this._removeElements(article, elementsToRemove)

    return this._cleanText(article.textContent)
  }
}

module.exports = Bit2meSerializer
