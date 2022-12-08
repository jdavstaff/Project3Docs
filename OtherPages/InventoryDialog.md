# InventoryDialog
The Inventory view uses a dialog component which renders a pop up menu for entering input

-----

```js
export default function InventoryDialog({open, onClose, onUpdate, _name, _quantity, _id}) {}
```
Renders popup dialog box for making changes to the inventory
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**open** - Handler for opening dialog box
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**onClose** - Handler for closing dialog box
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**onUpdate** - Handler for updating inventory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_name** - Current name of item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_quantity** - Current quantity of item in inventory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_id** - Current identifier of item
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering an inventory update menu

-----

```js
const handleNameChange = (e) => {}
```
Handler for name changes
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**e** - Event causing change

-----

```js
const handleQuantityChange = (e) => {}
```
Handler for quantity changes
### Parameters
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
