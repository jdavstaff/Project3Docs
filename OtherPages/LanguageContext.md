# LanguageContext
Module used for keeping track of selected language choice throughout page changes

-----

```js
export function useLang() {}
```
Getter for current language choice
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current context value of language choice

-----

```js
export function useLangUpdate() {}
```
Setter for current language choice
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function for updating language choice

-----

```js
export function LangProvider({children}) {}
```
React component for maintaining language value in a component. [Functions](./LanguageProvider)
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**children** - Child components to maintain context for
### Returns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React component for maintaining language context in a component
