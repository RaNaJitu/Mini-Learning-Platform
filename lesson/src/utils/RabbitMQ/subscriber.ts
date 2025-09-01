// src/rabbitmq/subscriber.ts
import RabbitMQWrapper from '../RabbitMQ/rabbitMQWrapper';

const rabbitmq = new RabbitMQWrapper();

async function subscribeToRabbitMQ(queueName: string, callback: (message: any) => void): Promise<void> {
  try {
    await rabbitmq.connect();
    await rabbitmq.setupExchange();
    await rabbitmq.setupQueue(queueName, '#'); // Bind to all routing keys
    await rabbitmq.consumeMessages(queueName, callback);
  } catch (error) {
    console.error('Error subscribing to RabbitMQ:', error);
    throw error;
  }
}

export { subscribeToRabbitMQ };
