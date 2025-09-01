// src/rabbitmq/publisher.ts
import RabbitMQWrapper from '../RabbitMQ/rabbitMQWrapper';

const rabbitmq = new RabbitMQWrapper();

async function publishToRabbitMQ(routingKey: string, message: any): Promise<void> {
  try {
    await rabbitmq.connect();
    await rabbitmq.setupExchange();
    await rabbitmq.sendMessage(routingKey, message);
    await rabbitmq.disconnect();
  } catch (error) {
    console.error('Error publishing to RabbitMQ:', error);
    throw error;
  }
}

export { publishToRabbitMQ };
