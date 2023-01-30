import jwt  from "jsonwebtoken"
import db from "../database/index.js"
import authConfig from "../config/auth.js"
import bcrypt from "bcryptjs"

class SessionController {
    async create(req, res){
        const { email, senha } = req.body
        db.pool.execute('SELECT * from Usuario WHERE Email = ?',  [email], (error, results) => {
            
            if (error) return res.status(500).json({ error: "Internal server error." })
            if(Object.keys(results).length === 0) return res.status(401).json({ error: "User / password invalid." })
            
            const id = results[0].ID
            const user = results[0]

            bcrypt.compare(senha, user.Senha).then( (match) => {
                if(!match) return res.status(401).json({ error: " User / password invalid." })    

                res.status(200).json({
                    usuario: {
                        id,
                        email
                    },
                    token: jwt.sign({ id }, authConfig.secret,{
                        expiresIn: authConfig.expiresIn
                    })
                })
            })
        })
    }
}

export default new SessionController()