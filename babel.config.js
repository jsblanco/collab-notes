module.exports = (api) => {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin",
			[
				require.resolve("babel-plugin-module-resolver"),
				{
					root: ["."],
					alias: {
						"@app": "./src",
					},
					extensions: [
						".ios.ts",
						".android.ts",
						".ts",
						".ios.tsx",
						".android.tsx",
						".tsx",
						".jsx",
						".js",
						".json",
					],
				},
			],
		],
	};
};
