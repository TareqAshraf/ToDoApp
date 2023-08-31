import { Api, StaticSite, StackContext, Table, EventBus } from "sst/constructs";
import { z } from "zod";

export function Task({ stack }: StackContext) {
  const bus = new EventBus(stack, "taskbus", {
    defaults: {
      retries: 10,
    },
  });
  // Create the table
  const taskTable = new Table(stack, "Task", {
    fields: {
      taskId: "string",
      author: "string",
      title: "string",
      content: "string",
      date:'string',
      createdAt: "string",
    },
    primaryIndex: { partitionKey: "taskId" },
  });

  const taskApi = new Api(stack, "TaskApi", {
    defaults: {
      function: {
        bind: [bus],
        environment: {
          TABLE_NAME: taskTable.tableName,
        },
      },
    },
    routes: {
      "GET /task": "packages/functions/src/task.list",
      "POST /task": "packages/functions/src/task.create",
      "GET /task/{id}": "packages/functions/src/task.get",
      "PUT /task/{id}": "functions/src/task/task.update",
      "DELETE /task/{id}": "functions/src/task/task.remove",
    },
  });
  taskApi.attachPermissions([taskTable]);

  // Deploy our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: taskApi.url,
    },
    customDomain: "www.my-react-app.com",
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: taskApi.url,
  });
}
