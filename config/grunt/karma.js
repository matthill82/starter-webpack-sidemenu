module.exports = function (grunt, options) {
    return {
        options: {
            // list of files / patterns to load in the browser
            files: [
                'public/vendor/bower_components/angular/angular.js',
                'public/vendor/bower_components/angular-mocks/angular-mocks.js',
                'public/vendor/bower_components/angular-ui-router/release/angular-ui-router.js',
                'public/vendor/bower_components/angular-sanitize/angular-sanitize.js',
                'public/vendor/bower_components/angular-cookies/angular-cookies.js',
                'public/vendor/bower_components/angular-inview/angular-inview.js',
                'public/vendor/bower_components/angulartics/src/angulartics.js',
                'public/vendor/bower_components/angulartics/src/angulartics-kissmetrics.js',
                'public/vendor/bower_components/angulartics/src/angulartics-gtm.js',
                'public/vendor/bower_components/angular-animate/angular-animate.js',
                'app/app.module.js',
                'app/**/*.module.js',
                'app/*.js',
                'app/**/*.factory.js',
                'app/**/*.js',
                'app/*.spec.js',
                'www/views/*.html',
                'www/partials/*.html'
            ],
            singleRun: true,
            preprocessors: {
                'www/views/*.html': 'ng-html2js',
                'www/partials/*.html': 'ng-html2js',
                'app/**/!(*spec|*mock).js': ['coverage']
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: 'www/'
            },
            port: 9998,
            runnerPort: 9999,
            colors: true,
            reporters: ['dots', 'coverage'],
            frameworks: ["jasmine"],
            captureTimeout: 8500,
            reportSlowerThan: 500,
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: 'docs/coverage/'
                    },
                    {
                        type: 'text-summary'
                    },
                    {
                        type: 'cobertura',
                        dir: 'docs/karma-reports/',
                        file: 'cobertura-coverage.xml'
                    }
                ]
            },
            thresholdReporter: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80
            },
            loggers: [
                {
                    type: 'console'
                }
            ]
        },
        mac: {
            browsers: [
                'PhantomJS',
                'Safari',
                'Chrome'
            ]
        },
        window: {
            browsers: [
                'PhantomJS',
                'Firefox',
                'Chrome',
                'IE11'
            ]
        },
        light: {
            browsers: [
                'PhantomJS'
            ]
        }
    }
};
