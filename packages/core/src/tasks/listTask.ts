export * as listTask from "./listTask";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export async function list() {
    const params = {
        TableName: process.env.TABLE_NAME as string,
        KeyConditionExpression: "taskId = :taskId",
    };
    const results = await dynamoDb.scan(params).promise();
    return {
        statusCode: 200,
        body: results.Items,
    };

}
