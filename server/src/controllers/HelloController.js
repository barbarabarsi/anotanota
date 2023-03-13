class HelloController{

    async index(req, res){

        const ID = uuidv4()

        db.pool.query('UPDATE ITEM SET ID = ? WHERE Descricao = agua ', [ID], (error, results) => {
            if (error) return res.status(500).json({ error: "Internal server error." })
            res.status(200).json(results) 
        })
    }
}

export default new HelloController()