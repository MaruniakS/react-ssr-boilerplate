module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env', { 
                                targets: {
                                    browsers: ['last 2 versions']
                                },
                                corejs: 3, 
                                useBuiltIns: "usage" 
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }    
        ]
    }
}
