import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";


const getCoffeeStoreById = async (req, res) => {
     
    const {id} = req.query;

    try {
        if(id) {

            const records = await findRecordByFilter(id);

            if (records.length !== 0 ) {              
                res.json(records);
            } else {
                res.json({ message: `id ${id} could not be found!` })
            }




           
             
        } else {
            res.status(400);
            res.json({ message: "ID us missing"})
        }
        
    } catch(err) {
        console.error({ "an error happend": err});
        res.status(500);
        res.json({ message: "something went wrong", err });
    }

};

export default getCoffeeStoreById;