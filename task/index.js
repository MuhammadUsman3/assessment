
require("dotenv").config()
const express = require('express')
const router = require("./router")
const cron = require('node-cron');
const cors = require('cors');
const db = require("./database").getConnection();
const { getGasPrice } = require("./gasPriceFetcher")

cron.schedule('*/30 * * * *', () => {
  console.log('Cron job is running every 30 minutes!');
  getGasPrice().then((results) => {
    if (results.success) {
      const collection = db.collection(process.env.DB_COLLECTION);
      collection.insertOne(results.data)
    }
  })
});

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(router)


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})




