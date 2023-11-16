<p align="center">
   <img src="https://avatars.githubusercontent.com/u/88400076?s=200&v=4" alt="power" width="300" height="300">
</p>

# Server
 ## 🖥️💫 A quick express backend module.

 `npm i @antibot/server`
 
 `yarn add @antibot/server`

 ```js
const path = require("path");
const { Server } = require("@antibot/server");
const server = new Server({
  port: 3000,
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
```

# Routes
```js
const { Router } = require("@antibot/server");
const router = Router();

router.get("/hello", (req, res) => {
  res.send("Hello World!");
});

exports.default = router;
```