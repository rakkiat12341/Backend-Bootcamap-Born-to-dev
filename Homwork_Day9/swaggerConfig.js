const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation for homework day9",
      version: "1.0.0",
      description: " A simple API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", //URL Of API
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
