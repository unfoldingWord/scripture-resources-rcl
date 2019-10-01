Footnotes are not fully supported as they include internal markers that are not yet parsed.
The footnote `content` is rendered in a pop-over.

```js
const verseObject = {
  "content": "+ \\ft Some modern versions have \\fqa and in the ruins of the rich, lambs will graze \\fqb . ",
  "endTag": "f*",
  "nextChar": "\n",
  "tag": "f",
  "type": "footnote"
};

<FootnoteObject verseObject={verseObject} />
```