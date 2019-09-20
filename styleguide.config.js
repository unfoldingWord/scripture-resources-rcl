const Path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { name, version, repository } = require('./package.json');
const { styles, theme } = require('./styleguide.styles');



let sections = [
  {
    name: 'README',
    content: 'README.md',
  },
  {
    name: 'Verse Objects',
    components: () => {
      const componentNames = [
        'verse-object',
        'text-object',
        'word-object',
        'milestone-object',
        'aligned-words-object',
        'original-word-object',
      ];
      return componentNames.map(componentName => {
        const filename = upperFirst(camelCase(componentName));
        return Path.resolve(__dirname, `src/components/verse-object`, `${filename}.js`)
      });
    }
  },
  {
    name: 'Core',
    content: 'src/core/README.md',
  },
];

module.exports = {
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub'
  },
  webpackConfig: require('react-scripts/config/webpack.config')('development'),
  // serverPort: 3000,
  styles,
  theme,
  getComponentPathLine: (componentPath) => {
    const dirname = Path.dirname(componentPath, '.js');
    const file = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(file));
    return `import { ${componentName} } from "${name}";`;
  },
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  sections,
};
