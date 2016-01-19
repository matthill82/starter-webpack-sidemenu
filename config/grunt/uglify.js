module.exports = function (grunt, options) {
    return {
        options: {
            sourceMap: false,
            mangle: false,
            report: 'gzip',
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        },
        snapshot: {
            files: {
                'www/js/app.js':
                        ['public/vendor/bower_components/angular/angular.js',
                            'public/vendor/bower_components/angular-animate/angular-animate.js',
                            'public/vendor/bower_components/angular-sanitize/angular-sanitize.js',
                            'public/vendor/bower_components/angular-cookies/angular-cookies.js',
                            'public/vendor/bower_components/angular-inview/angular-inview.js',
                            'public/vendor/odometer.min.js',
                            'public/vendor/bower_components/angulartics/src/angulartics.js',
                            'public/vendor/bower_components/angulartics/src/angulartics-kissmetrics.js',
                            'public/vendor/bower_components/angulartics/src/angulartics-gtm.js',
                            'public/vendor/bower_components/angular-animate/angular-animate.js',
                            'public/vendor/bower_components/angular-ui-router/release/angular-ui-router.js',
                            'app/app.module.js',
                            'app/**/*.module.js',
                            'app/!(*spec|*mock|*route).js',
                            'app/**/*.factory.js',
                            'app/**/!(*spec|*mock|*route).js'
                        ]
            }
        }
    };
};
