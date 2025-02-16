class BaseSerializer {
  _removeElements(article, elementsToRemove) {
    const { tags, classes, ids } = elementsToRemove
    
    tags?.forEach(tag => {
      article.querySelectorAll(tag).forEach(el => el.remove())
    })

    classes?.forEach(className => {
      article.querySelectorAll(className).forEach(el => el.remove())
    })

    ids?.forEach(id => {
      article.querySelectorAll(id).forEach(el => el.remove())
    })
  }

  _removeParagraphsWithText(article, text) {
    article.querySelectorAll('p').forEach(p => {
      if (p.textContent.includes(text)) {
        p.remove()
      }
    })
  }

  _removeLinksWithText(article, text) {
    article.querySelectorAll('a').forEach(a => {
      if (a.textContent.includes(text)) {
        a.remove()
      }
    })
  }

  __removeSpanWithText(article, text) {
   article.querySelectorAll('span').forEach(span => {
      if (span.textContent.includes(text)) {
        span.remove();
      }
    })
  }

  _cleanText(text) {
    return text
      .replace(/<img[^>]*>/gi, '')
      .replace(/src=["'][^"']*["']/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }
}

module.exports = BaseSerializer
