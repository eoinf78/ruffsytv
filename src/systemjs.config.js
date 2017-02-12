//(function (global) {
    System.config({
        //use typescript for compilation
        transpiler: 'typescript',
        //typescript compiler options
        typescriptOptions: {
            emitDecoratorMetadata: true
        },
        paths: {
            // paths serve as alias
            'npm:': 'lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular': 'npm:@angular',
            '@angular/common': 'npm:@angular/common',
            '@angular/core': 'npm:@angular/core',
            '@angular/compiler': 'npm:@angular/compiler',
            '@angular/platform-browser': 'npm:@angular/platform-browser',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@types/lodash': 'npm:@types/lodash',
            // '@angular': 'npm:@angular',
            // '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            // '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            // '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            // '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            // '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            // '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            // '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            // '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'lodash': 'npm:lodash',
            'rxjs': 'npm:rxjs',
            'ng2-youtube-player': 'npm:ng2-youtube-player',
            'typescript': 'npm:typescript/lib',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            '@angular/core': {
                main: 'bundles/core.umd.js',
                defaultExtension: 'js'
            },
            '@angular/compiler': {
                main: 'bundles/compiler.umd.js',
                defaultExtension: 'js'
            },
            '@angular/common': {
                main: 'bundles/common.umd.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser-dynamic': {
                main: 'bundles/platform-browser-dynamic.umd.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser': {
                main: 'bundles/platform-browser.umd.js',
                defaultExtension: 'js'
            },
            lodash: {
                main: './index.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-youtube-player': {
                main: './ng2-youtube-player.js',
                defaultExtension: 'js'
            },
            'typescript': {
                main: './typescript.js',
                defaultExtension: 'js'
            }
        }
    });
//})(this);
