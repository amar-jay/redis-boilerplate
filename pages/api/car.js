import { createCar } from "../../lib/redis";

export default async function handler(req, res){
    const id = req && await createCar(req.body);
    // res.status(200).json({"message": "Congrats", id});
    res.status(200).json({id});
    // res.status(500).error({"messaage": "Internal Error"});
}