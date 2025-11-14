// head.js — centralized head setup for metadata only

(function setupHead() {
  const head = document.head;

  // Basic metadata
  head.appendChild(Object.assign(document.createElement('title'), { textContent: 'Community Hub' }));
  head.appendChild(Object.assign(document.createElement('meta'), {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  }));
  head.appendChild(Object.assign(document.createElement('meta'), {
    charset: 'UTF-8'
  }));
  head.appendChild(Object.assign(document.createElement('meta'), {
    name: 'theme-color',
    content: '#2c3e50'
  }));

  // Optional favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = '/Public/Media/favicon.ico'; // adjust path if needed
  head.appendChild(favicon);
})();
