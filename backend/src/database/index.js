import mysql from "mysql2"
import config from "../config/database"

class Database {
    constructor() {
        this.pool = mysql.createPool(config)
    } 
}

export default new Database()