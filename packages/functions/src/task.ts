import {ApiHandler} from "sst/node/api";
import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {DynamoDB} from "aws-sdk";
// import * as uuid from "uuid";
import {Task} from "@ToDo-app/core/task";
import crypto from "crypto";

const dynamoDb = new DynamoDB.DocumentClient();
export const create = ApiHandler(async (event) => {
//   return {
//     statusCode: 400, // Bad Request
//     body: JSON.stringify(
//         event.body
//     )
// };;
    if (!event.body) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify(
                {message: "Path parameters are missing in the request"}
            )
        };
    }
    const taskData = JSON.parse(event.body);
    // return{ taskData };
    const params = {
        TableName: process.env.TABLE_NAME as string,
        Item: {
            taskId: taskData.id,
            author: taskData.author,
            title: taskData.title,
            content: taskData.content,
            date: Date.now(),
            createdAt: Date.now()
        }
    };
    await dynamoDb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item)
    };
});

export const get = ApiHandler(async (event) => {
  if (!event.pathParameters) {
    return {
        statusCode: 400, // Bad Request
        body: JSON.stringify(
            {message: "Path parameters are missing in the request"}
        )
    };
}
// const taskData = event.pathParameters;

    const params = {
        TableName: process.env.TABLE_NAME as string,
        Key: {
            taskId: event.pathParameters.id
        }
    };
    const results = await dynamoDb.get(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Item)
    };
});

export const list = ApiHandler(async (_evt) => {
    const params = {
        TableName: process.env.TABLE_NAME as string,
        KeyConditionExpression: "taskId = :taskId"
    };
    const results = await dynamoDb.scan(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items)
    };
});
