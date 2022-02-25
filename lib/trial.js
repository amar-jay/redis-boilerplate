import { Entity, Schema, Repository, Client } from 'redis-om'

let aString;
let user, id;

let MY_URL = 'redis://Abdelmanan:oMgB1FwQnMQWouFsBXbMQNVDV8Qdfzgj@redis-10415.c55.eu-central-1-1.ec2.cloud.redislabs.com:10415';

class User extends Entity {}

let schema = new Schema(User, {
    name: { type: "string"},
    age: { type: "number"},
    email: { type: "string"},
    password: { type: "string"},
    createdAt: { type: "string"},
    traits: { type: "array"}
    });


(async () => {

    const client = new Client()

   //await client.open(MY_URL)
    await client.open("redis://localhost:6379")
   
    /* Client validation checking */
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

export { aString, user, id }
