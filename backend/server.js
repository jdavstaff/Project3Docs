const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path')
const { Pool } = require('pg')
const { Client } = require('pg-native')

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
    let totalItems = 0;
    input.forEach((order) => {
        totalPrice += parseFloat(prices[order.size])
        order.items.forEach((item) => {
            totalPrice += parseFloat(item.extra_price)
            totalItems++
        })
    })

    let i=0; // keeps track of how many items have been inserted

    // im sorry this has to be nested like this, you can only insert things asynchronously and this is the only way to make sure it is in the right order
    let query = `WITH INSERT_TICKET AS (INSERT INTO TICKET(ORDER_TIME, TOTAL_PRICE) VALUES (NOW() AT TIME ZONE 'US/Central', $1)) SELECT MAX(ID)+1 AS MAX FROM TICKET`
    // insert ticket
    pool.query(query, [totalPrice]).then((res) => {
        let ticketId = res.rows[0].max
        input.forEach((order) => {
            // insert orders
            query = `WITH INSERT_ORDER AS (INSERT INTO ORDERS(TICKET_ID, SIZE_ID) VALUES ($1, (SELECT ID FROM SIZE WHERE NAME = $2))) SELECT MAX(ID)+1 AS MAX FROM ORDERS`
            pool.query(query, [ticketId, order.size]).then((res2) => {
                let orderId = res2.rows[0].max
                order.items.forEach((item) => {
                    // insert items
                    query = `INSERT INTO BRIDGE(ORDER_ID, ITEM_ID, AMOUNT) VALUES ($1, $2,
                    (SELECT CASE WHEN CATEGORY = 'Side' THEN 2 ELSE 1 END FROM ITEM WHERE ID = $2))
                    ON CONFLICT (ORDER_ID, ITEM_ID) DO UPDATE SET AMOUNT = BRIDGE.AMOUNT+1`
                    pool.query(query, [orderId, item.id]).then((res3) => {
                        i++ // number of items inserted incremented

                        if(i == totalItems) { // this is the last item
                            // do decrements to inventory (important that this runs once at the end)
                            query = `WITH DECREMENT AS (
                                        SELECT 
                                            INVENTORY.INGREDIENT_ID, 
                                            SUM(BRIDGE.AMOUNT * ITEM_INGREDIENTS.AMOUNT) AS D 
                                        FROM TICKET 
                                        JOIN ORDERS 
                                            ON TICKET.ID = ORDERS.TICKET_ID 
                                        JOIN BRIDGE 
                                            ON ORDERS.ID = BRIDGE.ORDER_ID 
                                        JOIN ITEM 
                                            ON BRIDGE.ITEM_ID = ITEM.ID 
                                        JOIN ITEM_INGREDIENTS 
                                            ON ITEM.ID = ITEM_INGREDIENTS.ITEM_ID 
                                        JOIN INVENTORY
                                            ON ITEM_INGREDIENTS.INVENTORY_ID = INVENTORY.INGREDIENT_ID 
                                        WHERE TICKET.ID = (SELECT MAX(ID) FROM TICKET) 
                                        GROUP BY INVENTORY.INGREDIENT_ID
                                    ) 
                                    UPDATE INVENTORY 
                                    SET QUANTITY = QUANTITY - DECREMENT.D 
                                    FROM DECREMENT 
                                    WHERE DECREMENT.INGREDIENT_ID = INVENTORY.INGREDIENT_ID`
                            pool.query(query, (err, res) => {
                                if(err) {
                                    console.log(err);
                                }
                            })
                        
                            query = `WITH DECREMENT AS (
                                        SELECT 
                                            DISTINCT SIZE.NAME AS SIZE, 
                                            COUNT(SIZE.NAME) AS D 
                                        FROM TICKET 
                                        JOIN ORDERS 
                                            ON ORDERS.TICKET_ID = TICKET.ID 
                                        JOIN SIZE 
                                            ON SIZE.ID = ORDERS.SIZE_ID 
                                        JOIN INVENTORY 
                                            ON INVENTORY.NAME = SIZE.NAME 
                                        WHERE TICKET_ID = (SELECT MAX(ID) FROM TICKET) 
                                        GROUP BY SIZE.NAME
                                    ) 
                                    UPDATE INVENTORY 
                                    SET QUANTITY = INVENTORY.QUANTITY - DECREMENT.D 
                                    FROM DECREMENT 
                                    WHERE INVENTORY.NAME = DECREMENT.SIZE`;
                            pool.query(query, (err, res) => {
                                if(err) {
                                    console.log(err);
                                }
                            })
                        }
                    }).catch((err3) => {
                        console.log(err3)
                    })
                })
            }).catch((err2) => {
                console.log(err2)
            })
        })
    }).catch((err) => {
        console.log(err)
    })
    
    response.json({err: false})
})