export * as createTask from "./createTask";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const taskSchema = z.object({
    taskId: z.string(),
    author: z.string(),
    title: z.string(),
    content: z.string(),
    date: z.string(),
});

export async function create(event: APIGatewayProxyEventV2) {
    const { body } = event;
    try {
        const taskData = JSON.parse(body || "");
        const validatedData = taskSchema.parse(taskData);

        const existingTask = await dynamoDb
            .get({
                TableName: process.env.TABLE_NAME as string,
                Key: {
                    taskId: validatedData.taskId,
                },
            })
            .promise();

        if (existingTask.Item) {
            // Task with the same taskId already exists, return an error
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Task with the same taskId already exists",
                }),
            };
        }
        const params = {
            TableName: process.env.TABLE_NAME as string,
            Item: {
                taskId: validatedData.taskId,
                author: validatedData.author,
                title: validatedData.title,
                content: validatedData.content,
                date: validatedData.date,
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
