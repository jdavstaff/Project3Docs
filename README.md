# Team-15-Project_3


# Getting Started
- Clone repository
- Open terminal and run `cd backend`, and `npm install`, and `npm start`
- Open new terminal and run `cd frontend` and `npm install`, and `npm start`
- Happy Coding!

# Backend
Backend currently uses node.js and express.js
You need a `.env` file with secret keys for **Google Translate** and the **SQL Database** URL

# Frontend
Frontend currently uses React.js 
There are several components and **routes** that website currently runs in 

## Manager
Found in `frontend/src/pages/manager/Manager.js`
`Manager.js` displays 4 tabs with a list of tables
  - [`./Inventory.js`](./OtherPages/Inventory.md)
  - `./MyMenu.js`
  - `./Reports.js`
  - `./Access.js`

There are also some components that are used for user input
  - `./InventoryDialog.js`
  - `./MyMenuDialog.js`
  
## Customer
Found in `frontend/src/pages/customer/Customer.js`
`Customer.js` displays 2 views
  - `frontend/src/pages/view/OrderView.js`
  - `frontend/src/pages/view/PlateView.js`

## Cashier 
Found in `frontend/src/pages/cashier/Cashier.js`
`Cashier.js` displays 2 views
  - `frontend/src/pages/view/OrderView.js`
  - `frontend/src/pages/view/PlateView.js`
