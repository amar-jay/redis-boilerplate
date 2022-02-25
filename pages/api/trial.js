
import { aString, user, id } from "../../lib/trial"

export default async function handler(req, res){
    if (req.method === "GET") {
        res.status(200).json({
            message: aString, 
            user: user,
            id: id})
    } else {
        res.status(405).json({message: "Method not allowed, faults by user"});
    }
//    const id = req && await createCar(req.body);
    // res.status(200).json({"message": "Congrats", id});
}
