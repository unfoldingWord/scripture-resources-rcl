module.exports = function (api) {
	api.cache(true);

	const presets = [ "@babel/preset-env", "@babel/preset-react" ];
	const plugins = [ "inline-json-import", {} ];
	const ignore = [ "./src/components/mocks" ];

	return {
		presets,
		plugins,
		ignore
	};
};
