import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
// Use path.resolve with process.cwd() for Vercel compatibility
const dbPath = path.resolve(process.cwd(), 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Vercel routes /api/something to this function. 
// We should rewrite the incoming request so json-server handles it correctly.
server.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '');
  }
  next();
});

server.use(router);

export default server;
