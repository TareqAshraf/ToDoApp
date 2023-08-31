// api.ts
import { z } from 'zod';
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
// import { listTa/sk } from "@ToDo-app/core/src/tasks/listTask";
import { createTask } from "@ToDo-app/core/src/tasks/createTask";
import { getTask } from "@ToDo-app/core/src/tasks/getTask";
import { updateTask } from "@ToDo-app/core/src/tasks/updateTask";
import { listTask } from "@ToDo-app/core/src/tasks/listTask";
import { deleteTask } from "@ToDo-app/core/src/tasks/deleteTask"
const dynamoDb = new DynamoDB.DocumentClient();

// Define your API methods and their input/output types
export const taskApi = {
  taskList: {
    input: z.object({}),
    resolve: async () => {
        try {
            // Call your list function to get the list of tasks
            const result = await listTask.list();
            return result;
          } catch (error :any) {
            // Handle any errors that occur during the listing process
            throw new Error(`Failed to list tasks: ${error.message}`);
          }
    },  
  },
//   taskCreate: {
//     input: z.object({
//       author: z.string(),
//       title: z.string(),
//       content: z.string(),
//     }),
//     resolve: async (input: any) => {
//         const event = {
//             body: JSON.stringify(input),
//           };
//           const eventObject: APIGatewayProxyEventV2 ={
//             body: JSON.stringify(input),
//           };;
//           // Call the create function from createTask.ts with the event object
//           return createTask.create(eventObject);
//     },
//   },
  // Define more methods as needed
};
