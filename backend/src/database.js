import mysql from "mysql2"
import "dotenv/config"

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: 'db4free.net',
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: 'login_system'
        })
    } 
}

export default new Database()