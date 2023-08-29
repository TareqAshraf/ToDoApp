import { Api, StaticSite, StackContext, Table, EventBus } from "sst/constructs";

export function Blog({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });
  // Create the table
  const blogTable = new Table(stack, "Blog", {
    fields: {
      blogId: "string",
      author: "string",
      title: "string",
      content: "string",
      createdAt: "string",
    },
    primaryIndex: { partitionKey: "blogId" },
  });

  const blogApi = new Api(stack, "BlogApi", {
    defaults: {
      function: {
        bind: [bus],
        environment: {
          TABLE_NAME: blogTable.tableName,
        },
      },
    },
    routes: {
      "GET /blog": "packages/functions/src/blog.list",
      "POST /blog": "packages/functions/src/blog.create",
      // "GET /blogs/{id}": "functions/get-blogs.handler",
      // "PUT /blogs/{id}": "functions/update-blogs.handler",
      // "DELETE /blogs/{id}": "functions/delete-blogs.handler",
    },
  });
  blogApi.attachPermissions([blogTable]);

  // Deploy our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: blogApi.url,
    },
    customDomain: "www.my-react-app.com",
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: blogApi.url,
  });
}
