const config = {
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	printWidth: 80,
	tabWidth: 1,
	singleQuote: true,
	bracketSameLine: true,
	trailingComma: 'es5',
	arrowParens: 'always',
	useTabs: true,
	semi: true,
	importOrder: ['^react(.*)', '^@(.*)/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
	importOrderCaseInsensitive: true,
	importOrderSortSpecifiers: true,
	importOrderSeparation: false,
};

module.exports = config;
