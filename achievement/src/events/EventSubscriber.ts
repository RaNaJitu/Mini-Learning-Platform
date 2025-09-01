import { connect, NatsConnection } from 'nats';
import { LessonCompletedEventHandler } from '../modules/achievement/achievement.services';
import { LessonCompletedEvent } from './DomainEvent';

export class EventSubscriber {
    private connection: NatsConnection | null = null;
    private lessonCompletedHandler: LessonCompletedEventHandler;

    constructor() {
        this.lessonCompletedHandler = new LessonCompletedEventHandler();
    }

    async connect(natsUrl: string): Promise<void> {
        this.connection = await connect({ servers: natsUrl });
        console.log('Connected to NATS for event subscription');
    }

    async subscribeToEvents(): Promise<void> {
        if (!this.connection) {
            throw new Error('NATS connection not established');
        }

        // Subscribe to lesson completion events
        const lessonCompletedSubscription = this.connection.subscribe('events.LessonCompleted');
        
        console.log('Subscribed to lesson completion events');

        // Handle incoming events
        for await (const message of lessonCompletedSubscription) {
            try {
                const eventData = JSON.parse(message.data.toString());
                console.log('Received lesson completion event:', eventData);

                if (eventData.eventType === 'LessonCompleted') {
                    const event = new LessonCompletedEvent(
                        eventData.data.userId,
                        eventData.data.lessonId,
                        eventData.data.subject
                    );
                    await this.lessonCompletedHandler.handle(event);
                }
            } catch (error) {
                console.error('Error handling event:', error);
            }
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
