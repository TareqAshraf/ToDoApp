import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { TaskStack } from "./stacks/TaskStack";

export default {
  config(_input) {
    return {
      name: "ToDo-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(TaskStack);
    // app.;/
  }
} satisfies SSTConfig;
