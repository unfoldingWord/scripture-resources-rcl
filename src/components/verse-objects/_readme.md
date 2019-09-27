The VerseObject can accept any type of VerseObject and then renders the appropriate component.

The Types are:

- `text`: renders as `TextObject`
- `quote`: renders as `TextObject`
- `milestone`: renders as `MilestoneObject`
- `word`: renders as `WordObject` or `AlignedWordsObject`
- `section`: renders as an empty span
- `paragraph`: renders as an empty span
- `footnote`: renders as `<sup>f</sup>`
