# Inventory Functions
Stores information on current count of ingredients and materials in stock. Information is retrieved from the database hosted on AWS. Uses [InventoryDialog](./InventoryDialog.md) to take in user input.

-----

```js
export default function Inventory()
```
Component for table displaying inventory levels
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for displaying an inventory table

-----


```js
const handleEdit = (dat) => {}
```
Handler for editing inventory levels
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**dat** - Row to replace in inventory

-----

```js
const handleDelete = (dat) => {}
```
Handler for removing inventory entries
### Parameters
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
### Parameters
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
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**name** - Name for the inventory item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**quantity** - Amount of item to add to inventory
