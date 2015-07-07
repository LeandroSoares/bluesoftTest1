(function() {
    'use strict';
    //set ng routing
    angular.module('iBuy', ['ngRoute']);

    // config
    angular.module('iBuy')
        .config(configRouteProvider);

    function configRouteProvider($routeProvider) {
        $routeProvider
            .when('/', pageRouteConfig.home)
            .when('/login', pageRouteConfig.login)
            .when('/carrinho', pageRouteConfig.carrinho)
            .when('/produtos', pageRouteConfig.produtos)
            .when('/ofertas', pageRouteConfig.ofertas)
            .when('/pagamento', pageRouteConfig.pagamento)
            .when('/favoritos', pageRouteConfig.favoritos)
            .when('/configuracoes', pageRouteConfig.configuracoes);
    }
    
    //add login check on each route change
    angular.module('iBuy').run(onRouteRun);

    function onRouteRun($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", onRouteChange);

        function onRouteChange(event, next, current) {
            if ($rootScope.logged == false || $rootScope.logged == null) {
                // no logged user, we should be going to #login
                if (next.templateUrl == "app/pages/login.html") {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/login");
                }
            }
        }
    }
    var pageRouteConfig = {
        home: {
            templateUrl: 'app/pages/home.html',
            controller: 'mainController as page'
        },
        login: {
            templateUrl: 'app/pages/login.html',
            controller: 'loginController as login'
        },
        carrinho: {
            templateUrl: 'app/pages/cart.html',
            controller: 'cartController as page'
        },
        produtos: {
            templateUrl: 'app/pages/shop.html',
            controller: 'shopController as page'
        },
        ofertas: {
            templateUrl: 'app/pages/offers.html',
            controller: 'offersController as page'
        },
        pagamento: {
            templateUrl: 'app/pages/payout.html',
            controller: 'payoutController as page'
        },
        favoritos: {
            templateUrl: 'app/pages/fav.html',
            controller: 'favController as page'
        },
        configuracoes: {
            templateUrl: 'app/pages/config.html',
            controller: 'configController as page'
        }
    }
})();