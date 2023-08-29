export * as Task from "./task";
import { z } from "zod";
import crypto from "crypto";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { event } from "./event";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

// export const Events = {
//   Created: event("task.created", {
//     taskId: z.string(),
//   }),
// };

export async function create(event: APIGatewayProxyEventV2) {
  const { body } = event;
    const taskData = JSON.parse(body || "");
    const params = {
      TableName: process.env.TABLE_NAME as string,
      Item: {
        taskId: taskData.id,
        author: taskData.author,
        title: taskData.title,
        content: taskData.content,
        date: Date.now(),
        createdAt: Date.now(),
      },
    };
    ``;
    // await Events.Created.publish({
    //   taskData.id,
    // });
    await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
}

export function list() {
  return Array(50)
    .fill(0)
    .map((_, index) => ({
      id: crypto.randomUUID(),
      title: "Todo #" + index,
    }));
}
