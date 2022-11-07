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
const pool = new Pool(connectionParams);
pool.connect()

// start listening
app.listen(PORT, () => console.log('Server on PORT: ' + PORT))

app.get('/orders', (req, response) => {})

app.get('/inventory', (req, response) => {
    pool.query(`SELECT * FROM INVENTORY ORDER BY INGREDIENT_ID`, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/itemIngredients', (req, response) => {
    pool.query(`SELECT ITEM.NAME AS ITEM, ITEM.ID, ITEM.EXTRA_PRICE, ITEM.CATEGORY, INVENTORY.NAME AS INGREDIENT_NAME, INVENTORY.INGREDIENT_ID, ITEM_INGREDIENTS.AMOUNT FROM ITEM JOIN ITEM_INGREDIENTS ON ITEM.ID = ITEM_INGREDIENTS.ITEM_ID JOIN INVENTORY ON INVENTORY.INGREDIENT_ID = ITEM_INGREDIENTS.INVENTORY_ID`, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/salesReport', (req, response) => {
    let queryThing = `SELECT ITEM.NAME, SUM(AMOUNT) AS AMOUNT_SOLD FROM TICKET JOIN ORDERS ON TICKET.ID = ORDERS.TICKET_ID JOIN BRIDGE ON ORDERS.ID = BRIDGE.ORDER_ID JOIN ITEM ON BRIDGE.ITEM_ID = ITEM.ID WHERE TICKET.ORDER_TIME BETWEEN TIMESTAMP '${req.query.start}' AND TIMESTAMP '${req.query.end}' GROUP BY ITEM.NAME ORDER BY SUM(AMOUNT) DESC`
    
    pool.query(queryThing, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/excessReport', (req, response) => {
    let queryThing = `WITH SOLD AS (SELECT INVENTORY.NAME AS NAME, SUM(BRIDGE.AMOUNT * ITEM_INGREDIENTS.AMOUNT) AS AMOUNT FROM TICKET JOIN ORDERS ON ORDERS.TICKET_ID = TICKET.ID JOIN BRIDGE ON ORDERS.ID = BRIDGE.ORDER_ID JOIN ITEM ON BRIDGE.ITEM_ID = ITEM.ID JOIN ITEM_INGREDIENTS ON ITEM_INGREDIENTS.ITEM_ID = ITEM.ID JOIN INVENTORY ON ITEM_INGREDIENTS.INVENTORY_ID = INVENTORY.INGREDIENT_ID WHERE ORDER_TIME > TIMESTAMP '${req.query.start}' GROUP BY INVENTORY.NAME) SELECT ITEM.NAME AS ITEM_NAME, INVENTORY.NAME AS INGREDIENT_NAME, SOLD.AMOUNT / (SOLD.AMOUNT + INVENTORY.QUANTITY * 1.0) AS PERCENT_SOLD, SOLD.AMOUNT AS AMOUNT_SOLD, INVENTORY.QUANTITY + SOLD.AMOUNT AS TOTAL_QUANTITY FROM INVENTORY JOIN SOLD ON INVENTORY.NAME = SOLD.NAME JOIN ITEM_INGREDIENTS ON INVENTORY.INGREDIENT_ID = ITEM_INGREDIENTS.INVENTORY_ID JOIN ITEM ON ITEM_INGREDIENTS.ITEM_ID = ITEM.ID WHERE SOLD.AMOUNT / (SOLD.AMOUNT + INVENTORY.QUANTITY * 1.0) < 0.1`
    
    pool.query(queryThing, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/restockReport', (req, response) => {
    let queryThing = `WITH SOLD AS (SELECT INVENTORY.NAME AS NAME,SUM(BRIDGE.AMOUNT * ITEM_INGREDIENTS.AMOUNT) AS AMOUNT FROM TICKET JOIN ORDERS ON ORDERS.TICKET_ID = TICKET.ID JOIN BRIDGE ON ORDERS.ID = BRIDGE.ORDER_ID JOIN ITEM ON BRIDGE.ITEM_ID = ITEM.ID JOIN ITEM_INGREDIENTS ON ITEM_INGREDIENTS.ITEM_ID = ITEM.ID JOIN INVENTORY ON ITEM_INGREDIENTS.INVENTORY_ID = INVENTORY.INGREDIENT_ID WHERE ORDER_TIME > NOW() AT TIME ZONE 'US/Central'  - INTERVAL '7 DAYS' GROUP BY INVENTORY.NAME) SELECT INVENTORY.NAME, INVENTORY.QUANTITY AS CURRENT_AMOUNT, SOLD.AMOUNT AS LAST_7_DAYS_SALES, ROUND(SOLD.AMOUNT * 1.1 - INVENTORY.QUANTITY) AS RECOMMENDED_RESUPPLY FROM INVENTORY JOIN SOLD ON INVENTORY.NAME = SOLD.NAME WHERE INVENTORY.QUANTITY < SOLD.AMOUNT`
    
    pool.query(queryThing, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/sellsTogetherReport', (req, response) => {
    let queryThing = `WITH PAIRS AS ( SELECT ITEM.ID AS THIS, I2.ID AS OTHER FROM ITEM JOIN ITEM I2 ON ITEM.ID < I2.ID ), MATCHES AS ( SELECT * FROM BRIDGE JOIN PAIRS ON BRIDGE.ITEM_ID = PAIRS.THIS JOIN ORDERS ON BRIDGE.ORDER_ID = ORDERS.ID JOIN TICKET ON ORDERS.TICKET_ID = TICKET.ID WHERE PAIRS.OTHER IN (SELECT ITEM_ID FROM BRIDGE B WHERE B.ORDER_ID = BRIDGE.ORDER_ID) AND TICKET.ORDER_TIME BETWEEN TIMESTAMP '${req.query.start}' AND TIMESTAMP '${req.query.end}' ) SELECT ITEM1.NAME AS THIS_NAME, ITEM2.NAME AS OTHER_NAME, COUNT(ORDER_ID) FROM MATCHES JOIN ITEM ITEM1 ON THIS = ITEM1.ID JOIN ITEM ITEM2 ON OTHER = ITEM2.ID GROUP BY ITEM1.NAME, ITEM2.NAME ORDER BY COUNT(ORDER_ID) DESC`
    
    pool.query(queryThing, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/items', (req, response) => {
    pool.query(`SELECT * FROM ITEM WHERE CATEGORY = 'Entree' OR CATEGORY = 'Side'`, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})