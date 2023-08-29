export * as Task from "./task";
import { z } from "zod";
import crypto from "crypto";

import { event } from "./event";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

export const Events = {
  Created: event("task.created", {
          taskId: z.string(),
  }),
};

export async function create() {
    
  const params = {
        TableName: process.env.TABLE_NAME as string ,
        Item: {
          taskId: crypto.randomUUID(),
          author: 'tareq1',
          title: 'tareq1',
          content: 'tareq1',
        date:'tareq1',
          createdAt: Date.now(),
        },
      };
      await dynamoDb.put(params).promise();

  // await Events.Created.publish({
  //   id,
  // });
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
