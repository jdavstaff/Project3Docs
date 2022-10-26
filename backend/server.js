const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path')
const { Pool } = require('pg')

dotenv.config({path: './.env'})
const PORT = process.env.PORT || 1111 // this needs to match proxy in front-end package.json

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname + "/public")))

// start database connection
const connectionParams = {
    connectionString: process.env.URL,
    password: process.env.PASSWORD,
    user: process.env.USER,
    ssl: {
        rejectUnauthorized: false
    }
}
const pool = new Pool(connectionParams);
pool.connect()

// start listening
app.listen(PORT, () => console.log('Server on PORT: ' + PORT))
pool.query(`SELECT * FROM ORDERS`, (err, res) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log(res.rows)
    }
})