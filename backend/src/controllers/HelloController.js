class HelloController{
    async index(req, res){
        return res.json({hello: "teste"})
    }
}

export default new HelloController()