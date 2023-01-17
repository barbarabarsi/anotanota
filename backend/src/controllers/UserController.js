import db from "../database"

class UsersController{
    
    // Mostra todos os usuários 
    async index(req, res){
        
        db.pool.query('SELECT * from Usuario', (error, results) => {
            if (error) return res.status(500).json({ error: "Internal server error." })
            res.status(200).json(results) 
        })  

    }

    // Mostra um usuário específico
    async show(req, res){

        const { id } = req.params

        db.pool.execute('SELECT * from Usuario WHERE ID = ?',  [id], (error, results) => {
            if (error) return res.status(500).json({ error: "Internal server error." })
            res.status(200).json(results)      
        })  

    }

    // Cria um usuário
    async create(req, res){

        const { ID, Email, Nome, Senha } = req.body
        
        db.pool.execute('INSERT INTO Usuario VALUES (?,?,?,?)', [ID, Email, Nome, Senha], (error, results) => {
            if(error){
                if(error = 1062) return res.status(422).json({ message: `User ${Email} already exists.` })
                return res.status(500).json({ error: "Internal server error." })
            }
            res.status(200).json(results)     
        })

    }

    // Atualiza um usuário
    async update(req, res){

        const { id } = req.params
        const { Email, Nome, Senha } = req.body
        
        db.pool.execute('SELECT * from Usuario WHERE ID = ?',  [id], (error, results) => {
            if (error) return res.status(500).json({ error: "Internal server error." })
        
            if(Object.keys(results).length === 0) return res.status(404).json({ error: "User doesnt exists." })
        
            db.pool.execute('UPDATE Usuario SET Email = ?, Nome = ?, Senha = ? WHERE ID = ?',[Email, Nome, Senha, id],(error, results) => { 
                if(error) return res.status(500).json({ error: "Internal server error." })
                res.status(200).json(results)   
            })
        })    

    }

    // Deleta um usuário
    async delete(req, res){

        const { id } = req.params
        
        db.pool.execute('SELECT * from Usuario WHERE ID = ?',  [id], (error, results) => {
            if (error){
                console.error(error)
                return res.status(500).json({ error: "Internal server error." })
            } 
        
            if(Object.keys(results).length === 0) return res.status(404).json({ error: "User doesnt exists." })
        
            db.pool.execute('DELETE FROM Usuario WHERE ID = ?',[id],(error, results) => { 
                if(error) return res.status(500).json({ error: "Internal server error." })
                res.status(200).json(results)   
            })
        })

    }
}

export default new UsersController()