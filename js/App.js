// create the module and name it iBuy
// also include ngRoute for all our routing needs
var iBuy = angular.module('iBuy', ['ngRoute']);

// configure our routes
iBuy.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController as page'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController as login'
        })
        .when('/carrinho', {
            templateUrl: 'pages/cart.html',
            controller: 'cartController as page'
        })
        .when('/produtos', {
            templateUrl: 'pages/shop.html',
            controller: 'shopController as page'
        })
        .when('/ofertas', {
            templateUrl: 'pages/offers.html',
            controller: 'offersController as page'
        })
        .when('/pagamento', {
            templateUrl: 'pages/payout.html',
            controller: 'payoutController as page'
        })
        .when('/favoritos', {
            templateUrl: 'pages/fav.html',
            controller: 'favController as page'
        })
        .when('/configuracoes', {
            templateUrl: 'pages/config.html',
            controller: 'configController as page'
        });
});
iBuy.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if ($rootScope.logged == false || $rootScope.logged == null) {
            // no logged user, we should be going to #login
            if (next.templateUrl == "pages/login.html") {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/login");
            }
        }
    });
});
var store=[{
        key_name: 'toddy',
        name: 'Toddy',
        cost: 5,
        qty: 0,
        img: 'products/toddy.jpg',
        oferta: false
    }, {
        key_name: 'arros_camil',
        name: 'Arroz Camil',
        cost: 5,
        qty: 0,
        img: 'products/arroz-camil.jpg',
        oferta: false
    }, {
        key_name: 'candida',
        name: 'Água sanitária',
        cost: 7,
        qty: 0,
        img: 'products/candida.jpg',
        oferta: false
    }, {
        key_name: 'detergente_limpol_neutro',
        name: 'Detergente Limpol Neutro',
        cost: 3,
        qty: 0,
        img: 'products/detergente-limpol-neutro.jpg',
        oferta: false
    }, {
        key_name: 'detergente_alpes_maca',
        name: 'Detergente Alpes Maçã',
        cost: 3,
        qty: 0,
        img: 'products/detergente-alpes-maca.jpg',
        oferta: false
    }, {
        key_name: 'feijao_camil',
        name: 'Feijão Camil',
        cost: 3,
        qty: 0,
        img: 'products/feijao-camil.jpg',
        oferta: false
    }];
var cards = [{
        card: "bancodobrasil",
        name: 'Banco do Brasil',
        img: "img/cards/bancodobrasil-128px.png"
    }, {
        card: "boleto",
        name: 'Boleto',
        img: "img/cards/boleto-128px.png"
    }, {
        card: "bradesco",
        name: 'Bradesco',
        img: "img/cards/bradesco-128px.png"
    }, {
        card: "elo",
        name: 'Elo',
        img: "img/cards/elo-128px.png"
    }, {
        card: "hipercard",
        name: 'Hipercard',
        img: "img/cards/hipercard-128px.png"
    }, {
        card: "hsbc",
        name: 'HSBC',
        img: "img/cards/hsbc-128px.png"
    }, {
        card: "itau",
        name: 'Itau',
        img: "img/cards/itau-128px.png"
    }, {
        card: "mastercard",
        name: 'Mastercard',
        img: "img/cards/mastercard-128px.png"
    }, {
        card: "oipaggo",
        name: 'Oipaggo',
        img: "img/cards/oipaggo-128px.png"
    }, {
        card: "pagseguro",
        name: 'Pagseguro',
        img: "img/cards/pagseguro-128px.png"
    }, {
        card: "paypal",
        name: 'Paypal',
        img: "img/cards/paypal-128px.png"
    }, {
        card: "visa",
        name: 'Visa',
        img: "img/cards/visa-128px.png"
    }];
    // create the controller and inject Angular's $scope
iBuy.controller('mainController', function($scope, $http, $rootScope, $location) {
    var _self = this;
    this.name = 'iBuy';

    updateVal();
    window.addEventListener('resize', function() {
        updateVal();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    $scope.cards=cards;
    function updateVal() {
        $scope.$fullScreenMinusHeader = window.innerHeight - 50 + 'px';
    }
    $scope.goTo = function(page) {
        $location.path(page);
    }
    $scope.Store = store;

    $scope.fav = [];

    $scope.cart = [];
    $scope.cartItem = {};

    $scope.isFav = function(item) {
        if ($scope.fav.indexOf(item) == -1) return 'off';
        return 'on';
    }

    $scope.favItem = favItem;

    function favItem(item) {
        var fav_index = $scope.fav.indexOf(item);
        if (fav_index == -1) {
            $scope.fav.push(item);
        } else {
            $scope.fav.splice(fav_index, 1)
        }
        console.log($scope.fav)
    }

    favItem($scope.Store[0]);
    addItem($scope.Store[0]);
    addItem($scope.Store[0]);
    addItem($scope.Store[1]);

    // $scope.menuStatus = 'menu-close';
    closeMenu();
    $scope.openMenu = openMenu;

    function openMenu() {
        $scope.menuStatus = 'menu-open';
    }

    $scope.closeMenu = closeMenu;

    function closeMenu() {
        $scope.menuStatus = 'menu-close';
    }

    //register
    $scope.addItem = addItem;

    function addItem(item) {
        if ($scope.cart.indexOf(item) == -1) {
            item.qty = 1;
            $scope.cart.push(item);
            $scope.cartItem[item.key_name] = item;
        } else {
            $scope.cartItem[item.key_name].qty++;
        }
    }
    //register
    $scope.removeItem = removeItem;

    function removeItem(item) {
        if ($scope.cart.indexOf(item) > -1) {
            $scope.cartItem[item.key_name].qty--;
            if ($scope.cartItem[item.key_name].qty <= 0) {
                console.log('acabou')
                var index = $scope.cart.indexOf(item);
                $scope.cart.splice(index, 1);
                $scope.cartItem[item.key_name] = undefined;
            }

        }
    }
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.qty * item.cost;
        })

        return total;
    }
    $http.get('/data/data.json')
        .success(function(data, status, headers, config) {
            $scope.loginData = data;
        })
        .error(function(data, status, headers, config) {
            console.log(data)
        });
    $scope.user = {}
    $scope.$back = function() {
        window.history.back();
    };
    $scope.logout = function() {
        $rootScope.logged = false;
        $location.path("/");
        console.log($rootScope)
    };
});

iBuy.controller('loginController', function($scope, $rootScope, $location) {
    var _self = this;
    _self.class = 'on';
    _self.wrong = false;
    console.log($rootScope);
    if ($rootScope.logged) {
        // _self.class = 'off displayNone';
    }
    _self.$validateUser = function() {
        var allOk = {
            user: false,
            pass: false
        }

        if ($scope.user.name == $scope.loginData.user) {
            allOk.user = true;
        }

        if ($scope.user.pass == $scope.loginData.pass) {
            allOk.pass = true;
        }

        if (allOk.user && allOk.pass) {
            // _self.class = 'off transit-top';
            // setTimeout(function() {_self.class = 'off displayNone'}, 800);
            $rootScope.logged = true;
            $location.path("/");
            console.log($rootScope)
            _self.wrong = false;
        } else {
            _self.wrong = true;
            _self.class = 'on error';
            _self.errorMessage = allOk.user ? 'Password incorreto, coloque: ' + $scope.loginData.pass : 'Username incorreto, coloque: ' + $scope.loginData.user;
        }
    }

});

iBuy.controller('cartController', function($scope) {
    // $scope.message = 'Look! I am an about page.';
    var _self = this;
    _self.name = 'Carrinho';

    updateVal();
    window.addEventListener('resize', function() {
        updateVal();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    function updateVal() {
        _self.middleSize = window.innerHeight - 250 + 'px';
    }
    this.inCartText='no carrinho: '
});

iBuy.controller('shopController', function($scope) {
    var _self = this;
    this.name = 'Produtos';

    updateVal();

    window.addEventListener('resize', function() {
        updateVal();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    })

    function updateVal() {
        _self.middleSize = window.innerHeight - 100 + 'px';
    }
    this.inCartText='no carrinho: '

});

iBuy.controller('favController', function($scope) {
    this.name = 'Favoritos';
});

iBuy.controller('offersController', function($scope) {
    this.name = 'Ofertas';
    $scope.Ofertas = [];
    for (var i in $scope.Store) {
        if ($scope.Store[i].oferta)
            $scope.Ofertas.push($scope.Store[i]);
    }
});
iBuy.controller('payoutController', function($scope) {
    this.name = 'Pagamento';
});
iBuy.controller('configController', function($scope) {
    this.name = 'Configurações';
});