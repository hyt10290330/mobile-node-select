module.exports = {
  plugins: {
    autoprefixer: {
      cascade: false,
      browsers: [
        'ie >= 8',
        'Firefox >= 20',
        'Safari >= 5',
        'Android >= 4',
        'Ios >= 6',
        'last 4 version',
      ],
    },
    // 'postcss-px2rem-exclude': {
    //   remUnit: 75,
    //   exclude: /node_modules|folder_name/i,
    // },
    'postcss-adaptive': {
      remUnit: 75,
      autoRem: true,
    },
  },
}
