import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticketCreatedPublisher';
console.clear();
const stan = nats.connect('tacket', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    const data = {
        id: '123213',
        title: 'testConcert',
        price: 20
    }

    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish(data)
    } catch (error) {
        console.error(error);
    }




    // stan.publish('ticket:created',data, ()=>{
    //     console.log('Event published');
    // })
})
