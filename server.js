const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  if (url === '/work.html') {
    res.writeHead(301, { 'Location': '/solutions.html' });
    res.end();
    return;
  }

  const filePath = path.join(DIR, url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIR, '404.html'), (e2, d2) => {
        res.writeHead(e2 ? 500 : 404, { 'Content-Type': 'text/html' });
        res.end(e2 ? 'Server Error' : d2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('BNS server running at http://localhost:' + PORT);
});
