export * as updateTask from "./updateTask";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const taskSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  content: z.string(),
});

export async function update(event: APIGatewayProxyEventV2) {
    const { body } = event;
    try {
        const taskData = JSON.parse(body || "");
        const validatedData = taskSchema.parse(taskData);
        const params = {
          TableName: process.env.TABLE_NAME as string,
          Key: {
            taskId: validatedData.taskId,
          },
          UpdateExpression: "SET content = :content, title = :title",
          ExpressionAttributeValues: {
            ":title": validatedData.title,
            ":content": validatedData.content,
          },
        };
        const results = await dynamoDb.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(results.Attributes),
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
