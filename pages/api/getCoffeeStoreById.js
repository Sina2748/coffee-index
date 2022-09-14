const getCoffeeStoreById = (req, res) => {
     
    const {id} = req.query;

    try {
        if(id) {
            res.json({ message: `id is created ${id}` })
            
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