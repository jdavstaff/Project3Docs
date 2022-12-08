# Reports Functions
-----

```js
function formatTimestamp(time) {}
```
Converts javascript timestamp to PostgreSQL timestamp format
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**time** Javascript timestamp input from date-time picker
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String object in the form of a PostgreSQL timestamp

-----

```js
function formatPercent(decimal) {}
```
Formats decimal for report view
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**decimal** - Decimal number representing a percent
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A formatted percentage

-----

```js
function getSalesQuery(startTime, endTime) {}
```
Gets sales data between 2 timestamps and populates the sales report
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**startTime** - Javacript timestamp to start at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**endTime** - Javascript timestamp to end at

-----

```js
function getExcessQuery(startTime) {}
```
Gets excess data from a starting time and populates the excess report
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**startTime** - Starting timestamp

-----

```js
function getSellsTogetherQuery(startTime, endTime) {}
```
Gets sells together data between 2 timestamps and populates the sells together report
### Paramters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**startTime** - Timestamp to start at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**endTime** - Timestamp to end at

-----

```js
const handleSalesStartChange = (newValue) => {}
```
Handler for changing sales report start time
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newValue** - Timestamp to change to

-----

```js
const handleSalesEndChange = (newValue) => {}
```
Handler for changing sales report end time
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newValue** - Timestamp to change to

-----

```js
const handleExcessChange = (newValue) => {}
```
Handler for changing excess report start time
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newValue** - Timestamp to change to

-----

```js
const handleTogetherStartChange = (newValue) => {}
```
Handler for changing sales together report start time
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newValue** - Timestamp to change to

-----

```js
const handleTogetherEndChange = (newValue) => {}
```
Handler for changing sales together report end time
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**newValue** - Timestamp to change to
