import { Ticket } from "../tickets";

it('Implements concurrency control', async () => {

    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'Concurrency test',
        price: 20,
        userId: '123'
    });

    // Save the ticket to the database
    await ticket.save();

    // Fetch the ticket twice from the database
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // Save the first fetched ticket to the database

    await firstInstance!.save();
    // Save the second fetched ticket to the database

    expect(async () => {
        await secondInstance!.save();
    }).rejects.toThrow();

})

it('Increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'Concurrency test',
        price: 20,
        userId: '123'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});