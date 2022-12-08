# MyMenu
React component for creating a menu table view. Allows for viewing current menu items, and can add and remove menu items. Uses [MyMenuDialog](./MyMenuDialog.md) for taking in user input.

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
Component for rendering the menu view. [Functions](./MyMenuComponent.md)
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering the menu view
