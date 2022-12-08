# MyMenu
React component for creating a menu table view. Allows for viewing current menu items, and can add and remove menu items.

-----

```js
function createData(name, id, price, type, ingredients) {}
```
Creates menu item object with specified characteristics
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**name** - Name of menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical identifier for menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**price** - Price of menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**type** - Type of menu item (Entree, Side, Appetizer, Dessert)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ingredients** - List of ingredients that the menu item needs
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu item object holding the passed data

-----

```js
function createIngrData(name, id, amount) {}
```
Creates ingredient object with specified characteristics
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**name** - Name of ingredient
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical identifier for ingredient
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**amount** - Amount of ingredient used in menu item
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ingredient object holding the passed data

-----

```js
function Row({row, handleDelete}) {}
```
Component for rendering a row in the menu table
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**row** - Row to render
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**handleDelete** - Handler for deleting row
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering menu row

-----

```js
export default function MyMenu() {}
```
Component for rendering the menu view
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering the menu view

----

```js
const handleOpen = () => {}
```
Handler for opening dialog box

-----

```js
const handleClose = () => {}
```
Handler for closing dialog box

-----

```js
function handleDelete(id) {}
```
Handler for deleting a menu item
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical identifier of menu item to be removed

-----

```js
const addMenuItem = (newName, newIngredients, newPrice, newType) => {}
```
Handler for adding a new menu item
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newName** - Name of new menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newIngredients** - List of ingredients used in menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newPrice** - New price of menu item
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newType** - New type of menu item
