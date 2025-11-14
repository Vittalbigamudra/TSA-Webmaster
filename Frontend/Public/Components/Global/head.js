// head.js — centralized head setup for metadata + media

// Import dynamic media (works for png/jpg/svg)
import logoUrl from '@media/logo.png';
import resourceImageUrl from '@media/resourceimage.jpg';

(function setupHead() {
  const head = document.head;

  // Basic metadata
  head.appendChild(Object.assign(document.createElement('title'), { textContent: 'Community Hub' }));
  head.appendChild(Object.assign(document.createElement('meta'), {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  }));
  head.appendChild(Object.assign(document.createElement('meta'), { charset: 'UTF-8' }));
  head.appendChild(Object.assign(document.createElement('meta'), {
    name: 'theme-color',
    content: '#2c3e50'
  }));

  // Favicon (served directly from /favicon.ico)
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = '/favicon.ico';   // absolute path, works with publicDir
  head.appendChild(favicon);

  // OpenGraph / social preview image (dynamic import)
  const ogImage = document.createElement('meta');
  ogImage.setAttribute('property', 'og:image');
  ogImage.content = logoUrl;       // bundled by Vite
  head.appendChild(ogImage);

  // Twitter card image (dynamic import)
  const twitterImage = document.createElement('meta');
  twitterImage.setAttribute('name', 'twitter:image');
  twitterImage.content = resourceImageUrl; // bundled by Vite
  head.appendChild(twitterImage);
})();
