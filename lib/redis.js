import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client() // intilaization of new object

async function connect() {
	// open connection is it is not already open
	if (!client.isOpen()){
        //await client.open("redis-10415.c55.eu-central-1-1.ec2.cloud.redislabs.com:10415");
        await client.open("redis://localhost:6379");
        //await client.open("redis://redis-10415.c55.eu-central-1-1.ec2.cloud.redislabs.com:10415");
    } else {
        console.log("Redis connection is already open");
    }
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
/*

    (async () => {

    const client = new Client()

   //await client.open(MY_URL)
    await client.open("redis://localhost:6379")

    /* Client validation checking 
    //await client.execute(["SET", "foo", "bar"])
    //aString = await client.execute(["GET", "foo"])

    let repository = new Repository(schema, client)
    user = repository.createEntity()
    user.name = "Manan"
    user.age = 30
    user.email = "abdelmanan.abdelrahman03@gmail.com"
    user.password = "123456"
    user.createdAt = "21/12/2021"
    user.traits = ["fool", "coder", "lover"]

    id = await repository.save(user)


    await client.close()
})()
*/

export async function createCar(data){
	await connect();

	let repository = new Repository(schema, client);
//    console.log("repository", repository);

	const car = await repository.createEntity();
	car.make = data.make || "BMW";
	car.description = data.description || "Cool car";
	car.image = data.image || "https://www.bmw.com/content/dam/bmw/market/global/cars/x5/2015/x5-m-xdrive/x5-m-xdrive-interior-design-exterior-design-02-1.jpg";
	car.model = data.model || "ww";

	// data represents a plain js object
	const id = await repository.save(car);
    console.log("id", id);
    await client.close();
	

    return id;
}


