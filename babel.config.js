module.exports = {
	presets: [
		[
			'@babel/env',
			{
				modules: false,
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
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
