import {  findRecordByFilter } from "../../lib/airtable";


const favouriteCoffeeStoreById = async (req, res) => {
    
    if (req.method === "PUT" ) {
        try {
            const {id} = req.body;

            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0 ) {              
                    res.json(records); 
                } else {
                    res.json({ message: "thid dose not exist ", id });
                }

            } else {
                res.status(400);
                res.json({ message: "id is missing"});
            }
            

        } catch(err) {
            res.status(500);
            console.error("and error has happened Upvotting Coffee store", err);    
        }
        
    };
}

export default favouriteCoffeeStoreById;
