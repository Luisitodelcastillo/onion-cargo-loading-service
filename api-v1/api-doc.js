const apiDoc = {
  swagger: "2.0",
  basePath: "/v1",  // S'ha de posar la ruta amb la versió v1 en l'atribut url de swagger en el fitxer app.js
  info: {
    title: "Cargo Loading app API.",
    version: "1.0.0",
  },
  definitions: {
    Error: {
      additionalProperties: true,
    },
    Container: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        code: {
          type: "string",
        },
        description: {
          type: "string",
        },
        width: {
          type: "integer",
        },
        length: {
          type: "integer",
        },
        height: {
          type: "integer",
        },
        maxWeight: {
          type: "integer",
        },
      },
      required: ["id", "code", "width", "length", "height", "maxWeight"],
    },
    Healthcheck: {
      type: "object",
      properties: {
        number: {
          type: "integer",
        },
        code: {
          type: "string",
        },
        description: {
          type: "string",
        },
      },
      required: ["number", "code"],
    },

    User: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        code: {
          type: "string",
        },
        description: {
          type: "string",
        },
        width: {
          type: "integer",
        },
        length: {
          type: "integer",
        },
        height: {
          type: "integer",
        },
        maxWeight: {
          type: "integer",
        },
      },
      required: ["id", "code", "width", "length", "height", "maxWeight"],
    },

    Gestor:{
      type: "object",
      properties:{
        id: {
          type: "number",
        },
        nom: {
          type: "string",
        },
        token: {
          type: "integer",
        },
      },
      required: ["id", "nom", "token"],
    },

    Client: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        code: {
          type: "string",
        },
        dateStart: {
          type: "string",
        },
        dateFinal: {
          type: "string",
        },
        active: {
          type: "boolean",
        },
        token: {
          type: "string",
        },
        notes: {
          type: "string",
        },
      },
      required: ["id", "code", "dateStart", "dateFinal", "active", "token", "notes"],
    },
    
  },
  
  paths: {},

  // tags is optional, and is generated / sorted by the tags defined in your path
  // docs.  This API also defines 2 tags in operations: "creating" and "fooey".
  tags: [
    // {name: 'creating'} will be inserted by ./api-routes/users.js
    // {name: 'fooey'} will be inserted by ./api-routes/users/{id}.js
    //{ description: 'Everything users', name: 'users' },
  ]
};

module.exports = apiDoc;

