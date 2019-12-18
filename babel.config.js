module.exports = {
	presets: [
		['@babel/env', { "modules": false }],
		'@babel/react',
	],
	plugins: ['inline-json-import', '@babel/transform-runtime', ["istanbul", {
		"include": [
			"src/**/**.js"
		],
		"exclude": [
			"**/mocks/**"
		]
	}]]
};
