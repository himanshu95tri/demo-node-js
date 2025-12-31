require("rootpath")();
import express from "express";
const swaggerJSDoc = require("swagger-jsdoc");
import * as swaggerUi from "swagger-ui-express";
import { urlencoded, json } from "body-parser";

let app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

let modeArgument = process.argv[2] ? process.argv[2].split("=") : undefined;
modeArgument = Array.isArray(modeArgument) ? modeArgument[1] : "admin";

const { uuid } = require("uuidv4");
const namespace = require("continuation-local-storage").createNamespace(
  "logger"
);

let options = require("./info");

// Run the context for each request. Assign a unique identifier to each request
app.use(async (req, res, next) => {
  namespace.run(async () => {
    namespace.set("logId", uuid());
    next();
  });
});

// initialize swagger-jsdoc`
const swaggerSpec = swaggerJSDoc(options.info);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3002, () => {
  console.log("Server listening on port " + 3002);
});
