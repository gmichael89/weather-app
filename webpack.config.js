const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: `${__dirname}/src/index.js`,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  { loader: 'sass-loader' }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/build`,
    },
    plugins: [HtmlWebpackPluginConfig],
    externals: {
        'AppConfig': JSON.stringify(require('./config/app-config.js'))
    }
};
