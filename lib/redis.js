import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client() // intilaization of new object

async function connect() {
	// open connection is it is not already open
	if (!client.isOpen()){ await client.open(process.env.REDIS_URL);}
}

// Creating Redis ORM
class Car extends Entity {} // Enttity is like a database table(Collection in firebase
let schema = new Schema(
	Car,
	// represents a hash in the redis database
	{
		make: { type: 'string' },
		model: {type: 'string'},
		image: {type: 'string'},
		description: {type: 'string'},
	},
	{
		dataStructure: 'JSON',
	}
);


export async function createCar(data){
	await connect();

	const repository = new Repository(client, schema);

	const car = repository.createEntity()
	car.make = data.make;
	car.description = data.description;
	car.image = data.image;
	car.model = data.model;
	// data represents a plain js object
	const id = await repo.save(car);

	return id;
}
