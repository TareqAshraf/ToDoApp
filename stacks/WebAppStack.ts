import { StaticSite, use, StackContext } from "sst/constructs";
import { TaskStack } from "./TaskStack";

export function WebAppStack({ stack, app }: StackContext) {
  const { taskApi } = use(TaskStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: taskApi.url,
    },
  });
  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000",
  });

  
}