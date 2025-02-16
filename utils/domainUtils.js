exports.domainUtils = {
  getDomainName(url) {
      try {
          // Extraer el hostname del URL usando URL API
          const hostname = new URL(url).hostname;
          
          // Dividir por puntos y filtrar
          const parts = hostname.split('.');
          
          // Si tiene www, lo removemos junto con el TLD
          if (parts[0] === 'www') {
              return parts[1];
          }
          
          // Si tiene subdominio pero no es www
          if (parts.length > 2) {
              return parts[parts.length - 2];
          }
          
          // Si solo tiene dominio y TLD
          return parts[0];
      } catch (error) {
          console.error('Error extracting domain name:', error);
          return '';
      }
  }
};