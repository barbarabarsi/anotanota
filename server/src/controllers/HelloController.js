class HelloController{
    async index(req, res){
        return res.json({hello: "hey!"})
    }
}

export default new HelloController()