import mysql from "mysql2"
import "../config/database"

class Database {
    constructor() {
        this.pool = mysql.createPool(config)
    } 
}

export default new Database()