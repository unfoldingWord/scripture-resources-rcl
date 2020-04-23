### Display Creative Commons License

This component will display an icon with tooltip for the 
given license. When clicked it will open a new window 
showing the license at the specified location.

```js
//const rights = 'CC BY-NC-ND';
//const rights = 'CC BY-NC-SA';
//const rights = 'CC BY-NC';
//const rights = 'CC BY-ND';
//const rights = 'CC BY-SA';
//const rights = 'CC BY';
//const rights = 'CC0';
//const rights = 'Public Domain';
const rights = 'CC BY-SA 4.0';
const link   = 'https://git.door43.org/unfoldingWord/en_tw/src/branch/master/LICENSE.md';
const width  = 80;
const height = 15;

<License rights={rights} licenseLink={link} width={width} height={height} />
```

