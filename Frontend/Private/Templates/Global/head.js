// head.js — centralized head setup and component script loader

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
  favicon.href = '/Frontend/Public/Media/favicon.ico';
  head.appendChild(favicon);

  // Component script loader
  const componentPaths = [
    '/Frontend/Private/Templates/Global/navbar.js',
    '/Frontend/Private/Templates/Global/body.js',
    '/Frontend/Private/Templates/Global/footer.js',
    '/Frontend/Private/Templates/Home/resources.js',
    '/Frontend/Private/Templates/Home/cards.js',
    '/Frontend/Private/Templates/Home/submission.js',
    '/Frontend/Private/Templates/Submission/submission.js'
    
    // Add more component scripts here as needed
  ];

  componentPaths.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    head.appendChild(script);
  });
})();
