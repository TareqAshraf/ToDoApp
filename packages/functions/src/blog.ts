import { ApiHandler } from "sst/node/api";
// import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { Blog } from "@ToDo-app/core/blog";

const dynamoDb = new DynamoDB.DocumentClient();
export const create = ApiHandler(async (_evt) => {
  await Blog.create();
});

export const list = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify(Blog.list()),
  };
});
