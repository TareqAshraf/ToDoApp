import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Task } from "./stacks/Task";

export default {
  config(_input) {
    return {
      name: "ToDo-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(Task);
  }
} satisfies SSTConfig;
