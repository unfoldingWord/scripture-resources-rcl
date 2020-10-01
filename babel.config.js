module.exports = {
  'presets': ['@babel/preset-env', '@babel/preset-react'],
  'plugins': [
    'inline-json-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    [
      'istanbul',
      {
        'include': ['src/**/**.js'],
        'exclude': ['**/mocks/**'],
      },
    ],
  ],
  'ignore': ['**/*.usfm.js'],
};
