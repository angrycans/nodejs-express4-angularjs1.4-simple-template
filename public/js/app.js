/**
 * INSPINIA - Responsive Admin Theme
 *
 */
'use strict';



var app  =angular.module('AmsApp', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        //'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        //'ngIdle',                        // Idle timer
       // 'ngCookies',
        'ngStorage',
    ]);




var BASEINFO = {

    ADDRESS:'http://127.0.0.1:3000/api/v1',

};

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad