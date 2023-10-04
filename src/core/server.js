const http = require("http");

const createServer = ({ app }) => http.createServer(app);

const startServer = ({ server, port }) =>
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

module.exports = {
  createServer,
  startServer,
};
