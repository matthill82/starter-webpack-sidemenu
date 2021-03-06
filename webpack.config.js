'use strict';

/**
 * Module dependencies
 */

var path              = require( 'path' ),
    webpack           = require( 'webpack' ),
    HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
    ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
    DEBUG             = true,
    RELEASE           = 'dev',
    Clean             = require( 'clean-webpack-plugin' );

// Delcare some PATHS to make it all easier
var PATHS = {
	app        : path.join(__dirname, '/app'),
	bower      : path.join( __dirname, 'public/bower_components/' ),
	nodeModules: path.join( __dirname, 'node_modules' ),
	scssFolder : path.join( __dirname, 'public/scss' )
};

module.exports = {

	cache        : true,
	entry        : {
		vendor: [
			PATHS.bower + 'ionic/js/ionic.bundle'
		],
		app   : ['./app/bootstrap.js']
	},
	output       : {
		path    : path.join( __dirname, 'www' ),
		filename: (DEBUG ? 'js/[name].bundle.js' : 'js/[name].[hash].bundle.js')
	},
	devtool      : !DEBUG ? false : false,
	debug        : DEBUG,
	module       : {
		preLoaders: [{
			test   : /\.js$/,
			exclude: /node_modules|bower_components/,
			loader : 'eslint-loader'
		}],
		loaders   : [{
			test  : /\.html$/,
			loader: 'html'
		}, {
			test   : /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader : "babel",
			query  : {
				presets: ['es2015']
			}
		}, {
			test  : /\.json$/,
			loader: 'json'
		}, {
			test  : /\.png$/,
			loader: "url-loader?limit=100000"
		},{
			test  : /\.jpg$/,
			loader: "file-loader"
		}, {
			test  : /\.scss$/,
			loader: ExtractTextPlugin.extract(
				'css!sass?outputStyle=' + (DEBUG ? 'expanded' : 'compressed') + '&' +
				'includePaths[]=' +
				PATHS.scssFolder, {
					publicPath: '../../'
				}
			)
		}, {
			test  : /\.woff/,
			loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
		}, {
			test  : /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader?name=fonts/[name].[hash].[ext]'
		}, {
			test: /\.gif/,
			loader: 'url-loader?limit=15&mimetype=image/gif&name=images/[hash].[ext]'
		}, {
			test: /\.jpg/,
			loader: 'url-loader?limit=15&mimetype=image/gif&name=images/[hash].[ext]'
		}, {
			test: /\.png/,
			loader: 'url-loader?limit=15&mimetype=image/png&name=images/[hash].[ext]'
		},  {
			test  : /\.svg/,
			loader: 'file?prefix=font/'
		}, {
			test  : /[\/]angular\.js$/,
			loader: 'exports?angular'
		}, {
			test  : /[\/]ionic\.js$/,
			loader: 'exports?ionic'
		}]
	},
	resolve : {
		root : [
			path.join( __dirname, 'app' ),
			path.join( __dirname, 'public/bower_components' ),
			path.join( __dirname, 'node_modules' )
		],
		extensions : [
			'',
			'.js', '.coffee',
			'.html', '.jade',
			'.css', '.styl', '.scss', '.less'
		],
		moduleDirectories: [
			'public/bower_components',
			'node_modules'
		],
		alias : {}
	},
	noParse : [
		PATHS.nodeModules + '/',
		PATHS.nodeModules + '/angular',
		PATHS.nodeModules + '/angular-ui-router',
		PATHS.nodeModules + '/angular-animate',
		PATHS.nodeModules + '/angular-sanitize'
	],
	resolveLoader: {
		root: PATHS.nodeModules
	},
	plugins      : [
		new Clean( ['www'] ),
		new webpack.DefinePlugin( {
			'process.env': {
				// This has effect on the lib size
				'NODE_ENV': JSON.stringify( 'production' )
			}
		} ),
		new HtmlWebpackPlugin( {
			pkg     : require( './package.json' ),
			chunks  : ['app', 'vendor'],
			template: 'app/index.html'
		} ),
		new ExtractTextPlugin( (DEBUG ? 'css/[name].bundle.css' : 'css/[name].[hash].bundle.css') )
	]

};
