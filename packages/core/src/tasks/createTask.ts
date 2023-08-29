export * as createTask from "./createTask";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const taskSchema = z.object({
    id: z.string(),
    author: z.string(),
    title: z.string(),
    content: z.string(),
});

export async function create(event: APIGatewayProxyEventV2) {
    const { body } = event;
    try {
        const taskData = JSON.parse(body || "");
        const validatedData = taskSchema.parse(taskData);
        const params = {
            TableName: process.env.TABLE_NAME as string,
            Item: {
                taskId: validatedData.id,
                author: validatedData.author,
                title: validatedData.title,
                content: validatedData.content,
                date: Date.now(),
                createdAt: Date.now(),
            },
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
