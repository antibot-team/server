const path = require("path");
const { Server } = require("../dist");
const server = new Server({
  port: 2000,
  settings: {
    routesDirectory: path.join(process.cwd(), "/tests/routes/"),
    routesEndpoint: "/api",
    debug: true,
  },
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

server.start();
