import { EventSubscriber } from './EventSubscriber';

export async function startEventSubscriber(): Promise<void> {
    const subscriber = new EventSubscriber();
    
    try {
        await subscriber.connect(process.env.NATS_URL || "nats://nats:4222");
        console.log('Event subscriber started successfully');
        
        // Start listening for events
        await subscriber.subscribeToEvents();
    } catch (error) {
        console.error('Error starting event subscriber:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down event subscriber...');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down event subscriber...');
    process.exit(0);
});
