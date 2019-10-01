UnsupportedObject generally don't have a `type` attribute.
They may have `text` or `content` that will render in a pop-over.

```js
const verseObject = {
  "text": "For the chief musician; on stringed instruments. A psalm of David.\n",
  "tag": "d",
};

<UnsupportedObject verseObject={verseObject} />
```