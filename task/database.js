class DB {
    constructor() {
      if (!DB.instance) {
        console.log('Initializing connection with db...')
        console.log(process.env.DB_URI);
        const { MongoClient } = require("mongodb")
        this.client = new MongoClient(process.env.DB_URI)
        this.db = this.client.db(process.env.DB_NAME);
        DB.instance = this
      }
      return DB.instance
    }
  
    getConnection = () => {
      return this.db;
    }
  
    getClient = () => {
      return this.client
    }
  }
  
  
  
  const instance = new DB()
  Object.freeze(instance)
  
  module.exports = instance