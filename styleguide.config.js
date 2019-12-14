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
    name: 'Resources ',
    content: 'src/components/resources/_readme.md',
    components: () => {
      const componentNames = [
        'withResource',
        'withResources',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/resources`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Selections ',
    content: 'src/components/selections/_readme.md',
    components: () => {
      const componentNames = [
        'withSelections',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/selections`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'USFM ',
    content: 'src/components/usfm/_readme.md',
    components: () => {
      const componentNames = [
        'withUsfm',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/usfm`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Parallel Scripture ',
    content: 'src/components/parallel-scripture/_readme.md',
    components: () => {
      const componentNames = [
        'ParallelScripture',
        'ScriptureTable',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/parallel-scripture`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Book ',
    content: 'src/components/book/_readme.md',
    components: () => {
      const componentNames = [
        'BookHeaders',
        'Book',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/book`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Chapters ',
    content: 'src/components/chapters/_readme.md',
    components: () => {
      const componentNames = [
        'Chapter',
        'Chapters',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/chapters`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Verses ',
    content: 'src/components/verses/_readme.md',
    components: () => {
      const componentNames = [
        'Verse',
        'Verses',
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/verses`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Verse Objects',
    content: 'src/components/verse-objects/_readme.md',
    components: () => {
      const componentNames = [
        'VerseObjects',
        'VerseObject',
        'TextObject',
        'WordObject',
        'MilestoneObject',
        'AlignedWordsObject',
        'OriginalWordObject',
        'SectionObject',
        'FootnoteObject',
        'UnsupportedObject'
      ];
      return componentNames.map(componentName => {
        return Path.resolve(__dirname, `src/components/verse-objects`, `${componentName}.js`)
      });
    }
  },
  {
    name: 'Core',
    content: 'src/core/README.md',
    sections: [
      {
        name: 'Selections',
        content: 'src/core/selections/selections.md',
      },
    ],
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
  moduleAliases: {
    "scripture-resources-rcl": Path.resolve(__dirname, "src"),
  }
};
