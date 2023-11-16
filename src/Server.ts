import express, { Application, Router } from "express";
import helmet, { HelmetOptions } from "helmet";
import cors from "cors";
import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";
import glob from "glob";
import path from "path";

export interface ExpressJsonOptions {
  reviver?(key: string, value: any): any;
  strict?: boolean | undefined;
}

export interface ExpressTextOptions {
  defaultCharset?: string | undefined;
}

export interface ExpressUrlencodedOptions {
  extended?: boolean | undefined;
  parameterLimit?: number | undefined;
}

export interface ServerOptions {
  port?: number | 3000;
  host?: string;
  settings: {
    routesDirectory?: string;
    routesEndpoint?: string | "/api";
    useJson?: boolean;
    useText?: boolean;
    useUrlencoded?: boolean;
    json?: ExpressJsonOptions;
    text?: ExpressTextOptions;
    urlencoded?: ExpressUrlencodedOptions;
    viewEngine?: string;
    views?: string;
    debug?: boolean;
  };
  cors?: {
    origin?: string;
    methods?: string;
    preflightContinue?: boolean;
    optionsSuccessStatus: number;
  };
  helmet?: HelmetOptions;
  ratelimit?: RateLimitOptions;
}

export class Server {
  public app: Application;
  constructor(protected readonly options: ServerOptions) {
    this.app = express();
    this.options = options;
    this.#middleware();
    this.#mount();
  }

  #middleware(): void {
    if (this.options.settings) {
      if (this.options.settings.useJson) {
        this.app.use(express.json(this.options.settings.json));
      }

      if (this.options.settings.useText) {
        this.app.use(express.text(this.options.settings.text));
      }

      if (this.options.settings.useUrlencoded) {
        this.app.use(express.urlencoded(this.options.settings.urlencoded));
      }
    }
    if (this.options.cors) {
      this.app.use(cors(this.options.cors));
    }

    if (this.options.helmet) {
      this.app.use(helmet(this.options.helmet));
    }

    if (this.options.ratelimit) {
      this.app.use(rateLimit(this.options.ratelimit));
    }
  }

  #mount(): void {
    if (this.options.settings.routesDirectory) {
      const routes: string[] = glob.sync(
        path.join(this.options.settings.routesDirectory, "**/**/*.js")
      );
      if (this.options.settings.debug) {
        console.log("Found routes:", routes);
      }

      routes.forEach((routePath: string) => {
        const routeModule: { default: Router } = require(path.resolve(
          routePath
        ));
        if (this.options.settings.debug) {
          console.log("Loaded route:", routePath);
        }

        this.app.use(this.options.settings.routesEndpoint, routeModule.default);
      });
    }
  }

  public start(): void {
    if (this.options.settings.debug) {
      this.app.listen(this.options.port, () => {
        console.log(`Now listening to port ${this.options.port}`);
      });
    } else {
      this.app.listen(this.options.port);
    }
  }

  get getConfig(): ServerOptions {
    return this.options;
  }
}
