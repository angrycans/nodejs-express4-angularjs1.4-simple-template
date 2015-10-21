/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'
    , '$ocLazyLoadProvider', 'JS_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide,
              $ocLazyLoadProvider, jsRequires) {

    // Configure Idle settings
   // IdleProvider.idle(5); // in seconds
    //IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/app/dashboard");

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    $stateProvider
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "views/common/content.html",
        })
        .state('app.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard_1.html",
            resolve: {

            }
        })
        .state('app.usermanage', {
            url: "/usermanage",
            templateUrl: "views/usermanage.html",
            resolve:loadSequence('ngtable'),
            data: { pageTitle: 'User Manage' }
        })

        .state('app.profile', {
            url: "/profile",
            templateUrl: "views/profile.html",
            data: { pageTitle: 'Profile' }
        })
        .state('app.projects', {
            url: "/projects",
            templateUrl: "views/projects.html",
            data: { pageTitle: 'Projects' }
        })
        .state('app.project_detail', {
            url: "/project_detail",
            templateUrl: "views/project_detail.html",
            data: { pageTitle: 'Project detail' }
        })

         .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            resolve:loadSequence('loginCtrl'),

            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })

        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/forgot_password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })
       ;

        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        //console.log("login 1");
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            //console.log("login 2");
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');


                                    // console.log("rst=",$ocLL.load(nowLoad),nowLoad);
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            //console.log("login 3");
                            if (jsRequires.modules){
                                //console.log("login 5");
                                for (var m in jsRequires.modules){
                                    //console.log("login 6");
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name){
                                        // console.log("login 7",jsRequires.modules[m]);
                                        return jsRequires.modules[m];
                                    }
                                }
                            }



                            // console.log("login 4");
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }]
            };
        }

    }]);
app.run(function($rootScope, $state,$timeout,$http,$sessionStorage) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart ',$sessionStorage.user,$state,$state.current.name,fromParams);

        $timeout(function() {

            if (toState.name=='login'){

                if ($sessionStorage.user){
                    event.preventDefault();
                    $state.go("app.dashboard");
                    return;
                }

                //console.log('$stateChangeStart 1',$sessionStorage.user,$state,$state.current.name);

            }else{
                //console.log('$stateChangeStart 2',$rootScope.user,$state,$state.current.name);
                if (!$sessionStorage.user) {
                    //console.log('$stateChangeStart 3',$rootScope.user,$state,$state.current.name);
                    //$rootScope.user=1;
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });

    });

});
