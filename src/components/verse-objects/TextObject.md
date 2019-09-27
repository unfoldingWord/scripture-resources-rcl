```js
const verseObject = {"type":"text","text":"Jesus"};
<TextObject verseObject={verseObject} />
```

The TextObject may include linebreaks. These will be substituted with `<br/>` tags.

```js
const verseObject = {
  "type": "text",
  "text": "May peace be\nwith you.\n\tThe friends greet you.\nGreet the friends by name.\n"
};
<TextObject verseObject={verseObject} />
```