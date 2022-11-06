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

app.get('/items', (req, response) => {
    pool.query(`SELECT * FROM ITEM WHERE CATEGORY = 'Entree' OR CATEGORY = 'Side'`, (err, res) => {
        if(err) {
            response.json({err: err})
            return
        }
        response.json({rows: res.rows})
    })
})

app.get('/placeOrder', (req, response) => {
    let prices = {
        'Bowl': 6.4,
        'Plate': 7.9,
        'Bigger Plate': 9.4,
        'Appetizer': 1.9,
        'Drink': 0
    }

    let input = req.query.data
    let totalPrice = 0;
    input.forEach((order) => {
        totalPrice += parseFloat(prices[order.size])
        order.items.forEach((item) => {
            totalPrice += parseFloat(item.extra_price)
        })
    })

    let query = `WITH INSERT_TICKET AS (INSERT INTO TICKET(ORDER_TIME, TOTAL_PRICE) VALUES (NOW() AT TIME ZONE 'US/Central', $1)) SELECT MAX(ID) FROM TICKET`
    pool.query(query, [totalPrice]).then((res) => {
        let ticketId = res.data.rows[0].id
        input.forEach((order) => {
            query = `WITH INSERT_ORDER AS (INSERT INTO ORDERS(TICKET_ID, SIZE_ID) VALUES ($1, (SELECT ID FROM SIZE WHERE NAME = $2))) SELECT MAX(ID) FROM ORDERS`
            pool.query(query, [ticketId, order.size]).then((res2) => {
                let orderId = res.data.rows[0].id
                order.items.forEach((item) => {
                    query = `"INSERT INTO BRIDGE(ORDER_ID, ITEM_ID, AMOUNT) VALUES ($1, $2,
                    (SELECT CASE WHEN CATEGORY = 'Side' THEN 2 ELSE 1 END FROM ITEM WHERE ID = $2))
                    ON CONFLICT (ORDER_ID, ITEM_ID) DO UPDATE SET AMOUNT = BRIDGE.AMOUNT+1`
                    pool.query(query, [orderId, item.id]).then((res3) => {

                    }).catch((err3) => {
                        
                    })
                })
                
            }).catch((err2) => {

            })
        })
    }).catch((err) => {

    })
    response.json(true)
})