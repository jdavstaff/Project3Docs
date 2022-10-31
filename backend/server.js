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
    ssl: {
        rejectUnauthorized: false
    }
}
console.log(connectionParams)
const pool = new Pool(connectionParams);
pool.connect()

// start listening
app.listen(PORT, () => console.log('Server on PORT: ' + PORT))

app.get('/orders', (req, response) => {})

app.get('/inventory', (req, response) => {
    pool.query(`SELECT * FROM INVENTORY ORDER BY INGREDIENT_ID`, (err, res) => {
        if(err) {
            response.json({err: err})
            console.log(err)
            return
        }
        console.log(res.rows)
        response.json({rows: res.rows})
    })
})