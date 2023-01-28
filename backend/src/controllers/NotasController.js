import db from "../database"
import { v4 as uuidv4 } from 'uuid';

class NotasController{
    
    // Mostra todos as notas de um usuário 
    async index(req, res){
        
        const { UsuarioID } = req.params
        const { q } = req.query

        if (q){
            db.pool.query('SELECT * from Notas WHERE UsuarioID = ? AND Titulo LIKE ?', [UsuarioID, '%' + q + '%'], (error, results) => {
                if (error) return res.status(500).json({ error: "Internal server error." })
                res.status(200).json(results) 
            })  
        }
        else{
            db.pool.query('SELECT * from Notas WHERE UsuarioID = ?', [UsuarioID], (error, results) => {
                if (error) return res.status(500).json({ error: "Internal server error." })
                res.status(200).json(results) 
            })  
        }
        

    }


    // Cria uma nota 
    async create(req, res){

        const { UsuarioID } = req.params
        const { titulo, texto } = req.body
        
        const ID = uuidv4() // criação de um id aleatório

        db.pool.execute('INSERT INTO Notas VALUES (?,?,?,?)', [ID, titulo, texto, UsuarioID], (error, results) => {
            if(error){
                if(error = 1062){
                    return res.status(422).json({ message: `Note ${ID} already exists.` })
                } 
                return res.status(500).json({ error: "Internal server error." })
            }

            res.status(201).json(results)     
        })

    }

    // Deleta uma nota
    async delete(req, res){

        const { id } = req.params
        
        db.pool.execute('SELECT * from Notas WHERE ID = ?',  [id], (error, results) => {
            if (error){
                console.error(error)
                return res.status(500).json({ error: "Internal server error." })
            } 
        
            if(Object.keys(results).length === 0) return res.status(404).json({ error: "Note doesnt exists." })
        
            db.pool.execute('DELETE FROM Notas WHERE ID = ?',[id],(error, results) => { 
                if(error) return res.status(500).json({ error: "Internal server error." })
                res.status(200).json(results)   
            })
        })

    }
}

export default new NotasController()