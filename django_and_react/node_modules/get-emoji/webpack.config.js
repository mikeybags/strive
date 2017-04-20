var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './lib/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		library: 'get-emoji',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: require.resolve('babel-loader'),
				include: path.join(__dirname, 'lib'),
				query: {
					presets: ['es2015', 'stage-2']
				}
			},
			{ test: /\.(png)$/, loader: 'url-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		  compressor: {
		    pure_getters: true,
		    unsafe: true,
		    unsafe_comps: true,
		    screw_ie8: true,
		    warnings: false
		   }
		})
	]
};