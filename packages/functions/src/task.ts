import { ApiHandler } from "sst/node/api";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
// import * as uuid from "uuid";
import { Task } from "@ToDo-app/core/task";
import crypto from "crypto";

const dynamoDb = new DynamoDB.DocumentClient();
export const create = ApiHandler(async (_evt) => {
 let x= await Task.create();
// const taskData = JSON.parse(event.body);
//   const params = {
//     TableName: process.env.TABLE_NAME as string ,
//     Item: {
//       taskId: crypto.randomUUID(),
//       author: 'tareq1',
//       title: 'tareq1',
//       content: 'tareq1',
//     date:'tareq1',
//       createdAt: Date.now(),
//     },
//   };
//   await dynamoDb.put(params).promise();
//  
//   return {
//     statusCode: 200,
//     body: JSON.stringify(params.Item),
//   };
return {statusCode: 200,x};

});

export const get = ApiHandler(async (_evt) => {
  const params = {
        TableName: process.env.TABLE_NAME as string,
        Key: {
          taskId: '3c2992cd-5c99-45c4-ad89-8e8451e35483',
        },
      };
      const results = await dynamoDb.get(params).promise();
     
      return {
        statusCode: 200,
        body: JSON.stringify(results.Item),
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
        body: JSON.stringify(results.Items),
      };
});