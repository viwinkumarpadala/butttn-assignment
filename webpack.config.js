// webpack.config.js
const path = require('path');

module.exports = {
    entry: './app/submit/[formUrl]/page.tsx', // Entry point of your component
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output filename
        library: 'SubmitPage', // Expose the component as a global variable
        libraryTarget: 'umd', // Universal Module Definition
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpile JSX and TypeScript using Babel
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these file extensions
        alias: {
            '@': path.resolve(__dirname, ''), // Alias to your components directory
        },
        fallback: {
        fs: false, // or require.resolve('browserify-fs')
        stream: false, // or require.resolve('stream-browserify')
        zlib: false, // or require.resolve('browserify-zlib')
    }
    },
};
