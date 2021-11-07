const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const resolvePath = (p) => path.resolve(__dirname, p);
const { DefinePlugin } = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            '@': resolvePath('./src'),
            '@vars': resolvePath('./src/common'),
        },
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
        }),
        new DefinePlugin({
            REACT_APP_CLIENT_URL: '\'http://127.0.0.1:3000\'',
            REACT_APP_SERVER_URL: '\'http://127.0.0.1:5000\'',
        }),
    ],
};
