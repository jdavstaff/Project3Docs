# PlateView Functions

-----

```js
const getTitle = () => {}
```
Gets the title depending on the current view
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current view for the plate view (Bowl, Plate, Bigger Plate, Appetizer)

-----

```js
function extractGroups(rows, num) {}
```
Divides menu items into categories
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**rows** - List of data extracted from the database

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**num** - Number used for ensuring items have unique IDs
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An object containing a list of entrees, a list of sides, and a list of appetizers

-----

```js
const handleSideSelect = (id) => {}
```
Handler for selecting a side
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical ID for selected side

-----

```js
const handleAppetizerSelect = (id) => {}
```
Handler for selecting an appetizer
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical ID for selected appetizer

-----

```js
const handleEntreeSelect = (id) => {}
```
Handler for selecting the first entree choice
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical ID for selected entree

-----

```js
const handleEntreeSelect2 = (id) => {}
```
Handler for selecting the second entree choice
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical ID for selected entree

-----

```js
const handleEntreeSelect3 = (id) => {}
```
Handler for selecting the third entree choice
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Numerical ID for selected entree

-----

```js
const getSelectedItems = (dat) => {}
```
Retrieves all selected items on the page
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - List of all button choices

-----

```js
const handleAddBtn = () => {}
```
Handler for adding item to order summary
