module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ['.'],
					alias: {
						'@app/components': './src/components',
						'@app/screens': './src/screens',
						'@app/navigation': './src/navigation',
						'@app/models': './src/models',
						'@app/store': './src/store',
						'@app/ui': './src/ui',
					},
					extensions: [
						'.ios.ts',
						'.android.ts',
						'.ts',
						'.ios.tsx',
						'.android.tsx',
						'.tsx',
						'.jsx',
						'.js',
						'.json',
					],
				},
			],
		],
	};
};
