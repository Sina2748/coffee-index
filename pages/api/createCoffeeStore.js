const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

// console.log({table});

const createCoffeeStore = async (req, res) => {
    try {
        if (req.method === "POST" ) {
            // find record
            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id="3"`
            }).firstPage();

            console.log({findCoffeeStoreRecords});

            if (findCoffeeStoreRecords.length !== 0 ) {

                const records = findCoffeeStoreRecords.map(record => {
                    return {
                        ...record.fields,
                    }
                })
                res.json(records);
            } else {
            // creat a record
            const createRecords = await table.create([
                {
                    fields: {
                        id: "3",
                        name: "My Cofffee Store",
                        address: "my address is this",
                        neighbourhood: "some neighbourhood",
                        votting: 300, 
                        imgUrl: "http://myimages.com",
                    }
                }
            ])

            const records = createRecords.map(record => {
                return {
                    ...record.fields,
                }
            })
            res.json({ records })

            } 
        }
    } catch(err) {
        console.error('Error finding store', err);
        res.status(500);
        res.json({message: 'Error finding store', err});
    } 
    
}

export default createCoffeeStore;