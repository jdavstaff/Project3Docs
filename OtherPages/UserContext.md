# UserContext
Module used for keeping track of current user throughout page changes

-----

```js
export function useUserInfo() {}
```
Getter for current user
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current context value of user

-----

```js
export function useUserInfoUpdate() {}
```
Setter for current user
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function for updating user

-----

```js
export function UserInfoProvider({children}) {}
```
React component for maintaining user in a component. [Functions](./UserInfoProvider.md)
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**children** - Child components to maintain context for
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for maintaining user context in a component
