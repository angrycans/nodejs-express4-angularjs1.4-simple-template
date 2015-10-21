'use strict';

/**
 * Config constant
 */


app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    waitAuthenticated: 'wait-authenticated',
});

app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {

    },
    //*** angularJS Modules
    modules: [
        {
            name: 'loginCtrl',
            files: ['./js/ctrls/loginCtrl.js']
        },
        {
            name: 'ngtable',
            files: ['./js/plugins/ng-table/dist/ng-table.min.js','./js/plugins/ng-table/dist/ng-table.min.css']
        },


    ]
});
