var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: "./app.js",
	output: {
      filename: 'dl.js'
	},
	module: {
		loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
  	}
};

// TO RUN PRODUCTION:
// set NODE_ENV=production
// webpack -p

// TO RUN DEV
// set NODE_ENV=dev
// webpack --watch
