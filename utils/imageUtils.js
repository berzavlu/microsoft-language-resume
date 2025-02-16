exports.imageUtils = {
  extractFeaturedImage(item) {
      // Caso 1: Media content
      if (item.media) {
          if (item.media['$'] && item.media['$'].url) {
              return item.media['$'].url;
          }
          if (item.media['@_url']) {
              return item.media['@_url'];
          }
          if (typeof item.media === 'string') {
              return item.media;
          }
      }

      // Caso 2: Enclosure
      if (item.enclosure && item.enclosure.url) {
          return item.enclosure.url;
      }

      // Caso 3: Thumbnail directo
      if (item.thumbnail) {
          return item.thumbnail;
      }

      // Caso 4: Buscar en el contenido HTML
      if (item['content:encoded'] || item.content || item.description) {
          const contenido = item['content:encoded'] || item.content || item.description;
          const match = contenido.match(/<img[^>]+src="([^">]+)"/);
          if (match) {
              return match[1];
          }
      }
      
      // Caso 5: Imagen directa de feed JSON
      if (item.image) {
          return item.image;
      }

      return null;
  }
};