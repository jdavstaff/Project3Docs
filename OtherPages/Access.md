# Access
Component for rendering a page used for viewing and changing user access permissions. User levels are stored as numbers 
 - 0: customer
 - 1: cashier
 - 2: manager

-----

```js
function getPermissionName(permission) {}
```
Gets the permission label for a specified permission level
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**permission** - Numerical permission level
#### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String label for the given permission level

-----

```js
function SelectPermission({permission, handleChangePerm, id}) {}
```
React component for rendering a dropdown menu for assigning user permissions. [Functions](./SelectPermissionComponent)
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**permission** - Current numerical permission level
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**handleChangePerm** - Handler for permission changes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**id** - Email for the user
### Returns
React component for a user permissions dropdown menu

-----

```js
export default function Access() {}
```
React component for displaying user permissions for web application. [Functions](./AccessComponent)
### Returns
React componenet that renders a user access tab
