import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";


const createCoffeeStore = async (req, res) => {
    try {
        if (req.method === "POST" ) {

            const { id, name, neighbourhood, address, imgUrl, votting } = req.body;
            if (id) {
            // find record
            const records = await findRecordByFilter(id);

            if (records.length !== 0 ) {              
                res.json(records);

            } else {
            // creat a record
                if (name) {
                    const createRecords = await table.create([
                        {
                            fields: {
                                id,
                                name,
                                address,
                                neighbourhood,
                                votting, 
                                imgUrl,
                            }
                        } 
                    ])  

                    const records = getMinifiedRecords(createRecords); 
                    res.json({ records })

                } else {
                    res.status(400);
                    res.json({ message: "name is missing"});
                }

            } 
            } else {
                res.status(400);
                res.json({ message: "id is missing"});
            }

        }
    } catch(err) {
        console.error('Error creating or finding store', err);
        res.status(500);
        res.json({message: 'Error creating or finding store', err});
    } 
    
}

export default createCoffeeStore;