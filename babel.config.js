module.exports = {
	presets: [
		'@babel/env',
		'@babel/react',
	],
	plugins: ['inline-json-import', '@babel/transform-runtime', ["istanbul", {
		"include": [
			"src/*.js"
		],
		"exclude": [
			"**/mocks/**"
		]
	}]]
};
