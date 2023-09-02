import { Api, StaticSite, StackContext, Table, EventBus } from "sst/constructs";

export function TaskStack({ stack }: StackContext) {
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
      date: 'string',
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
      "GET /getUser": "packages/functions/src/create.create",
      "POST /task": "packages/functions/src/task.create",
      "GET /task/{id}": "packages/functions/src/task.get",
      "PUT /task/{id}": "packages/functions/src/task.update",
      "DELETE /task/{id}": "packages/functions/src/task.remove",
    },
  });
  taskApi.attachPermissions([taskTable]); 

  stack.addOutputs({
    ApiEndpoint: taskApi.url,
  });

    return {
      taskApi,
    };
}
