module.exports = {
    entry: __dirname + '/client/src/index.jsx',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties", "transform-export-extensions"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],

            }

        ],

    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/client/dist'
    }
};