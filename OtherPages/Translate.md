# Translate
Module used for transtlating page elements. Utilizes [Google Translate](https://cloud.google.com/translate) API.

-----

```js
function translate(element, langcode) {}
```
Recursive helper function for translating a given HTML element and its children
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**element** - HTML element to translate

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**langcode** - Google Translate code for language to translate element to

-----

```js
export function translateComponents(langcode) {}
```
Translates all page components to a given language
### Parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**langcode** - Google Translate code for language to translate page to
