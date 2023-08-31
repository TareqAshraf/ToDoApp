import { ApiHandler } from "sst/node/api";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { createTask } from "@ToDo-app/core/src/tasks/createTask";
import { getTask } from "@ToDo-app/core/src/tasks/getTask";
import { updateTask } from "@ToDo-app/core/src/tasks/updateTask";
import { listTask } from "@ToDo-app/core/src/tasks/listTask";
import { deleteTask } from "@ToDo-app/core/src/tasks/deleteTask";
import * as wams from "@ToDo-app/core/src/task";

const dynamoDb = new DynamoDB.DocumentClient();
export const create = ApiHandler(async (event) => {
    if (!event.body) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                message: "Path parameters are missing in the request",
            }),
        };
    }
    const eventObject: APIGatewayProxyEventV2 = event;
    const createResponse = await createTask.create(eventObject);

    return {
        statusCode: createResponse.statusCode,
        body: createResponse.body,
    };
});

export const get = ApiHandler(async (event) => {
    if (!event.pathParameters) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                message: "Path parameters are missing in the request",
            }),
        };
    }
    const eventObject: APIGatewayProxyEventV2 = event;
    const creatceResponse = await getTask.get(eventObject);

    return {
        statusCode: creatceResponse.statusCode,
        body: creatceResponse.body,
    };
});

export const list = ApiHandler(async (_evt) => {
    const creatceResponse = await listTask.list();
    return {
        statusCode: creatceResponse.statusCode,
        body: JSON.stringify(creatceResponse.body),
    };
});


export const update = ApiHandler(async (event) => {
    if (!event.pathParameters) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                message: "Path parameters are missing in the request",
            }),
        };
    }
    const eventObject: APIGatewayProxyEventV2 = event;
    const creatceResponse = await updateTask.update(eventObject);

    return {
        statusCode: creatceResponse.statusCode,
        body: creatceResponse.body,
    };
});

export const remove = ApiHandler(async (event) => {
    if (!event.pathParameters) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                message: "Path parameters are missing in the request",
            }),
        };
    }
    const eventObject: APIGatewayProxyEventV2 = event;
    const creatceResponse = await deleteTask.remove(eventObject);

    return {
        statusCode: creatceResponse.statusCode,
        body: creatceResponse.body,
    };
});

export const getuser = ApiHandler(async (event) => {
    if (!event.pathParameters) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                message: "Path parameters are missing in the request",
            }),
        };
    }
    const eventObject: APIGatewayProxyEventV2 = event;
    const creatceResponse = await wams.handler;

    return {
        // statusCode: creatceResponse.statusCode,
        body: creatceResponse,
    };
});