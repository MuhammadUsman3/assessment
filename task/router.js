const express = require("express")
const db = require("./database").getConnection();

const router = express.Router()

router.get("/gasprice", async (req, res) => {

    const collection = db.collection(process.env.DB_COLLECTION);
    const records = await collection.find({}).sort({ timestamp: -1 }).toArray();

    if (records.length == 0) {
        res.json({
            success: false,
            code: 404,
            data: []
        })
        return
    }
    res.json({ success: true, code: 200, data: records })
})



module.exports = router