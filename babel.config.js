module.exports = {
	presets: [
		'@babel/env',
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties', ["istanbul", {
		"include": [
			"src/components/**/**.js"
		],
		"exclude": [
			"**/mocks/**"
		]
	}]]
};
