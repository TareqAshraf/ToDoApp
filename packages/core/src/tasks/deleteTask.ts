export * as deleteTask from "./deleteTask";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const taskSchema = z.object({
  taskId: z.string(),
});

export async function remove(event: APIGatewayProxyEventV2) {
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
        const results = await dynamoDb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
