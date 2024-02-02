module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
