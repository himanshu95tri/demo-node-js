import { routes, APP } from "config";

export const info = {
  apis: ["api/*.api.yaml", "schemas/*.schema.yaml"],
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Demo Node JS",
      termsOfService: "http://swagger.io/terms/",
      description: "Demo Node JS",
      contact: {
        name: "API Support",
        email: "",
        url: "http://example.com/support",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    host: routes.HOST,
    basePath: routes.BASE_PATH,
    tags: [
      {
        name: "Auth Module",
        description: "Auth Module Functionality",
        externalDocs: {
          description: "Auth Module for Front-End",
        },
      }
      
    ],
    servers: [
      { url: 'http://localhost:3000/', description: "Localhost server" },
      { url: 'https://empireflow.creatorapps.ai/', description: "EmpireFlow dev server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        BadRequest: {
          description: "Bad request.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 400 },
                  error: { type: "string", example: "Bad Request" },
                  message: { type: "string", example: "Invalid input supplied" }
                }
              }
            }
          }
        },
        Unauthorized: {
          description: "Unauthorized.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 401 },
                  error: { type: "string", example: "Unauthorized" },
                  message: { type: "string", example: "Authentication required" }
                }
              }
            }
          }
        },
        NotFound: {
          description: "Not Found.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 404 },
                  error: { type: "string", example: "Not Found" },
                  message: { type: "string", example: "Resource not found" }
                }
              }
            }
          }
        },
        ServerError: {
          description: "Internal Server Error.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "integer", example: 500 },
                  error: { type: "string", example: "Internal Server Error" },
                  message: { type: "string", example: "Something went wrong on the server" }
                }
              }
            }
          }
        },
        GoogleTaskList: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task list.",
              example: "MDk3NjQ1MTY1MDUyMTY1NDU1MzA6MDow"
            },
            title: {
              type: "string",
              description: "The title of the task list.",
              example: "My Tasks"
            },
            updated: {
              type: "string",
              format: "date-time",
              description: "The date and time when the task list was last updated.",
              example: "2023-10-27T10:00:00.000Z"
            },
            selfLink: {
              type: "string",
              description: "The self link of the task list.",
              example: "https://www.googleapis.com/tasks/v1/users/@me/lists/MDk3NjQ1MTY1MDUyMTY1NDU1MzA6MDow"
            },
            kind: {
              type: "string",
              description: "Type of the resource. This is always \"tasks#taskList\".",
              example: "tasks#taskList"
            }
          },
          required: [
            "id",
            "title"
          ]
        },
        GoogleTask: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task.",
              example: "MDk3NjQ1MTY1MDUyMTY1NDU1MzA6MDow"
            },
            title: {
              type: "string",
              description: "The title of the task.",
              example: "Buy groceries"
            },
            notes: {
              type: "string",
              description: "The notes of the task.",
              example: "Milk, eggs, bread"
            },
            due: {
              type: "string",
              format: "date-time",
              description: "The due date of the task.",
              example: "2023-10-28T17:00:00.000Z"
            },
            status: {
              type: "string",
              enum: [
                "needsAction",
                "completed"
              ],
              description: "The status of the task.",
              example: "needsAction"
            },
            updated: {
              type: "string",
              format: "date-time",
              description: "The date and time when the task was last updated.",
              example: "2023-10-27T10:00:00.000Z"
            },
            selfLink: {
              type: "string",
              description: "The self link of the task.",
              example: "https://www.googleapis.com/tasks/v1/users/@me/lists/MDk3NjQ1MTY1MDUyMTY1NDU1MzA6MDow/tasks/MDk3NjQ1MTY1MDUyMTY1NDU1MzA6MDow"
            },
            parent: {
              type: "string",
              description: "The parent task ID for subtasks.",
              example: "parentTaskId"
            },
            position: {
              type: "string",
              description: "The position of the task in the task list.",
              example: "00000000000000000000"
            },
            completed: {
              type: "string",
              format: "date-time",
              description: "The completion date and time of the task.",
              example: "2023-10-27T10:00:00.000Z"
            },
            deleted: {
              type: "boolean",
              description: "Indicates if the task is deleted.",
              example: false
            },
            hidden: {
              type: "boolean",
              description: "Indicates if the task is hidden.",
              example: false
            },
            kind: {
              type: "string",
              description: "Type of the resource. This is always \"tasks#task\".",
              example: "tasks#task"
            }
          },
          required: [
            "id",
            "title",
            "status"
          ]
        }
      }
    },
    schemes: ["http"],
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io",
    },
  },
}; 
