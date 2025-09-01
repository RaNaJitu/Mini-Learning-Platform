import { connect, NatsConnection } from 'nats';
import { DomainEvent, EventPublisher } from './DomainEvent';

export class NatsEventPublisher implements EventPublisher {
  private connection: NatsConnection | null = null;

  async connect(natsUrl: string): Promise<void> {
    this.connection = await connect({ servers: natsUrl });
    console.log('Connected to NATS for event publishing');
  }

  async publish(event: DomainEvent): Promise<void> {
    if (!this.connection) {
      throw new Error('NATS connection not established');
    }

    try {
      const subject = `events.${event.eventType}`;
      const message = JSON.stringify(event);
      
      await this.connection.publish(subject, Buffer.from(message));
      console.log(`Published event ${event.eventType} with ID ${event.eventId}`);
    } catch (error) {
      console.error('Error publishing event:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      console.log('Disconnected from NATS');
    }
  }
}
