const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './typescript/Indentation_Length_Vertical_Jumps.ts',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, './'),
        filename: './typescript/experiment_configuration_02.js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        fallback: { "crypto": false },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
        ],
    },

};