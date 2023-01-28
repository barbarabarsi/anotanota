import jwt from "jsonwebtoken"
import { promisify } from "util"
import config from "../config/auth"

export default async (req, res, next) => {
    
    const auth = req.headers.authorization

    if(!auth) return res.status(401).json({ error: 'Token was not provided' })
    
    const [ , token] = auth.split(' ')

    

    try{
        const decoded = await promisify(jwt.verify)(token, config.secret)
        req.userId = decoded.Id
        return next()
    }
    catch(err){
        
        return res.status(401).json({ error: 'Invalid token' })
    }

}