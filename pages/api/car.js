import { createCar } from "../../lib/redis";

export default async function handler(req, res){
    if (req.method === "POST") {
        const car_id = await createCar(req.body);
        carid = JSON.stringify(JSON.parse(car_id))
        res.status(200).send({car_id: carid});
    } else if (req.method === "GET") {
        res.status(200).json({message: "It is a POST request"});
    } else {
        res.status(405).json({message: "Method not allowed, faults by user"});
    }
//    const id = req && await createCar(req.body);
    // res.status(200).json({"message": "Congrats", id});
}
