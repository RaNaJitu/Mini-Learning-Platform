// src/rabbitmq/RabbitMQWrapper.ts
import { connect, NatsConnection, JetStreamClient } from 'nats';
import * as dotenv from 'dotenv';

dotenv.config();

class RabbitMQWrapper {
  private connection: NatsConnection | null;
  private jetstream: JetStreamClient | null;
  private subject: string;

  constructor() {
    this.connection = null;
    this.jetstream = null;
    this.subject = 'lesson.events'; // Modify with your subject name
  }

  async connect(): Promise<void> {
    try {
      const NATS_URL = process.env.NATS_URL as string;
      this.connection = await connect({ servers: NATS_URL });
      this.jetstream = this.connection.jetstream();
      console.log('Connected to NATS');
    } catch (error) {
      console.error('[RabbitMQWrapper] Error connecting to NATS:', error);
      throw error;
    }
  }

  async setupExchange(): Promise<void> {
    try {
      if (!this.jetstream) {
        throw new Error('JetStream not initialized.');
      }

      console.log(`[RabbitMQWrapper] Subject '${this.subject}' is ready`);
    } catch (error) {
      console.error(`[RabbitMQWrapper] Error setting up subject '${this.subject}':`, error);
      throw error;
    }
  }

  async setupQueue(queueName: string, routingKey: string): Promise<void> {
    try {
      if (!this.jetstream) {
        throw new Error('JetStream not initialized.');
      }

      console.log(`[RabbitMQWrapper] Queue '${queueName}' setup with routing key '${routingKey}'`);
    } catch (error) {
      console.error(`[RabbitMQWrapper] Error setting up queue '${queueName}':`, error);
      throw error;
    }
  }
  
  async sendMessage(routingKey: string, message: any): Promise<void> {
    try {
      if (!this.connection) {
        throw new Error('Connection not initialized.');
      }

      await this.connection.publish(routingKey, Buffer.from(JSON.stringify(message)));
      console.log(`[RabbitMQWrapper] Sent message with routing key '${routingKey}':`, message);
    } catch (error) {
      console.error(`[RabbitMQWrapper] Error sending message to '${routingKey}':`, error);
      throw error;
    }
  }
  
  async consumeMessages(queueName: string, callback: (message: any) => void): Promise<void> {
    try {
      if (!this.connection) {
        throw new Error('Connection not initialized.');
      }

      console.log(`[RabbitMQWrapper] Waiting for messages in subject '${queueName}'. To exit press CTRL+C`);

      const subscription = this.connection.subscribe(queueName);
      for await (const message of subscription) {
        const content = message.data.toString();
        const data = JSON.parse(content);
        console.log(`[RabbitMQWrapper] Received message from subject '${queueName}':`, data);

        // Execute callback function with received message
        if (callback && typeof callback === 'function') {
          callback(data);
        }
      }
    } catch (error) {
      console.error(`[RabbitMQWrapper] Error consuming messages from subject '${queueName}':`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        await this.connection.close();
      }
      console.log('[RabbitMQWrapper] Disconnected from NATS');
    } catch (error) {
      console.error('[RabbitMQWrapper] Error disconnecting from NATS:', error);
      throw error;
    }
  }
}

export default RabbitMQWrapper;
