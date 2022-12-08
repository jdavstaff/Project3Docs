# PlateView
React component for rendering a item selection page. Page appears different depending on which button was selected in [`OrderView`](./OrderView.md). For bowls, users can select one side and one entree. For plates, users can select one side and two entrees. For bigger plates, users can select one side and three entrees. For appetizers, users can select which appetizer they want. 

-----

```js
function EntreeSelection({entreeData, handleEntreeSelect}) {}
```
Renders [`SelectButtons`](./SelectButtons.md) for available entrees.
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**entreeData** - List of available entrees

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**handleEntreeSelect** - Handler for entrees when selected
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for entree selection

-----

```js
export default function PlateView({handleView, view, addItem}) {}
```
Renders a plate view for selecting entrees, sides, or appetizers when applicable. [Functions](./PlateViewComponent.md)
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**handleView** - Handler for returning to [`OrderView`](./OrderView.md)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**view** - Current view (1: Bowl, 2: Plate, 3: Bigger Plate, -1: Appetizer)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**addItem** - Handler for adding selections to checkout summary when finished
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for rendering an item selection page
