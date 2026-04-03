import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
// Use path.join to find db.json in the project root relative to this file
const dbPath = path.join(__dirname, '..', 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Vercel routes /api/products to this function. 
// We rewrite it so json-server sees /products
server.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '');
  }
  next();
});

server.use(router);

export default server;
