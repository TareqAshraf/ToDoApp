import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { taskApi } from './api';

export const create = async () => {
  try {
    
    const result = await taskApi.taskList.resolve();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

