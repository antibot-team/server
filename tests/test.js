const path = require("path");
const { Server } = require("../dist");
const server = new Server({
  port: 2000,
  settings: {
    routesDirectory: path.join(process.cwd(), "/tests/routes/"),
    views: path.join(process.cwd(), "/dist/"),
    viewExt: "js",
    routesEndpoint: "/api",
    debug: true,
  },
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
  ratelimit: {
    message: "You have hit the ratelimit. Please try again later.",
  },
});

server.start();
