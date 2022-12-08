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
  - `./Inventory.js`
  - `./MyMenu.js`
  - `./Reports.js`
  - `./Access.js`

There are also some components that are used for user input
  - `./InventoryDialog.js`
  - `./MyMenuDialog.js`
  
### Inventory
Stores information on current count of ingredients and materials in stock. Information is retrieved from the database hosted on AWS.

-----

```js
export default function Inventory()
```
Component for table displaying inventory levels
#### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for displaying an inventory table

-----


```js
const handleEdit = (dat) => {}
```
Handler for editing inventory levels
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**dat** - Row to replace in inventory

-----

```js
const handleDelete = (dat) => {}
```
Handler for removing inventory entries
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**dat** - Row to remove from the inventory

-----

```js
const handleDialogClose = () => {}
```
Closes popup for editing inventory items

-----

```js
const handleDialogUpdate = (name, quantity, id) => {}
```
Handles adding inventory entries
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**name** - Name for the inventory item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**quantity** - Amount of item in inventory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical identifier for inventory item

-----

```js
const handleAddDialogOpen = () => {}
```
Opens dialog box for adding inventory items

-----

```js
const handleAddDialogClose = () => {}
```
Closes dialog box for adding inventory items

-----

```js
const handleAddDialogUpdate = (name, quantity) => {}
```
Handles adding a new inventory item to the inventory
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**name** - Name for the inventory item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**quantity** - Amount of item to add to inventory

-----

### InventoryDialog
The Inventory view uses a dialog component which renders a pop up menu for entering input

-----

```js
export default function InventoryDialog({open, onClose, onUpdate, _name, _quantity, _id}) {}
```
Renders popup dialog box for making changes to the inventory
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**open** - Handler for opening dialog box
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**onClose** - Handler for closing dialog box
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**onUpdate** - Handler for updating inventory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_name** - Current name of item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_quantity** - Current quantity of item in inventory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_id** - Current identifier of item
#### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering an inventory update menu

-----

```js
const handleNameChange = (e) => {}
```
Handler for name changes
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**e** - Event causing change

-----

```js
const handleQuantityChange = (e) => {}
```
Handler for quantity changes
#### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**e** - Event causing change

-----

```js
const handleUpdate = () => {}
```
Handler for updating inventory

-----

```js
const handleClose = () => {}
```
Handles closing the dialog box

-----



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
