import mysql from "mysql2"
import config from "../config/database.js"

class Database {
    constructor() {
        this.pool = mysql.createPool(config)
    } 
}

export default new Database()