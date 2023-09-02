import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { TaskStack } from "./stacks/TaskStack";
import { WebAppStack } from "./stacks/WebAppStack";

export default {
  config(_input) {
    return {
      name: "ToDo-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(TaskStack).stack(WebAppStack);
    // app.;/
  }
} satisfies SSTConfig;
