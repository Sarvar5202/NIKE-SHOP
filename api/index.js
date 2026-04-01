import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add custom route rewrites if needed
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));
server.use(router);

export default server;
