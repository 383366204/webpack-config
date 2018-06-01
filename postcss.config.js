module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'autoprefixer': {
            browsers: ['last 5 version', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }
    }
}