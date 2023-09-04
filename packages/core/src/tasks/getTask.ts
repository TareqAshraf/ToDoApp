export * as getTask from "./getTask";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const taskSchema = z.object({
  taskId: z.string(),
});

export async function get(event: APIGatewayProxyEventV2) {
    const { body } = event;
    try {
        const taskData = JSON.parse(body || "");
        const validatedData = taskSchema.parse(taskData);
        const params = {
          TableName: process.env.TABLE_NAME as string,
          Key: {
            taskId: validatedData.taskId,
          },
        };
        const results = await dynamoDb.get(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(results.Item),
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
