# Journal

## 2020-04-23

After preview, the use of just the CC icon has problems. So I'll switch to the "button" SVG files instead.

1. NOTE: the "buttons" are actually just SVG files like the icons... so treat them as icons
2. Downloaded all the "buttons" SVG and deleted all current files in assets and `src/Icons`.
3. Moved the button SGV to the assets folder
3. Ran the svgr conversion to create the Icon directory files
4. Updated `License.js` and its README to test all the variants.

## 2020-04-22

1. Created this folder to contain the new license component.
I started with `Book.js` and `Book.md` by copying them into this
folder and then renaming them `License.js` and `README.md` respectively.

2. Next I downloaded all the creative commons icons.
I placed them into a new `./public` folder. There a number of the SVG files.
They are in `./public/cc-icons-svg`.

3. This article describes how to use them as icons 
[here](https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91). 
In particular the update to the article near the end has this example:
```js
import { ReactComponent as Icon} from './icon.svg';
<Icon />
```
More info [here](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs/).
And [here](https://www.robinwieruch.de/react-svg-icon-components).

4. Modified the code and readme.

5. Had to add `"react-scripts": "^2.1.8",` to `devDependencies`. Then `yarn install`.

6. Still didn't like my SVG files after `yarn start`; it aborted with an error to the effect
that it could not load them.

7. Following the `robinweiruch` article:
- created a top level dir named `assets`
- move the SVG files there
- deleted the now empty public folder
- installed the SVG command: `yarn add @svgr/cli --dev`
- added the `svgr` script to `package.json`
- ran `yarn svgr` and it generated all the files in `./src/Icons`
- tried `yarn start` again... did not abort this time.

8. The icon JS generated omitted to include a title element. Thus I added 
```
      <title>{props.title}</title>`
```
to the SVG file `Cc.js`. I guess this will need to be done for any icon code 
we need to use.
