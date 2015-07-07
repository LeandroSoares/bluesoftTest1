// create the module and name it iBuy
// also include ngRoute for all our routing needs
var iBuy = angular.module('iBuy', ['ngRoute']);
 
// configure our routes
iBuy.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/pages/home.html',
            controller: 'mainController as page'
        })
        .when('/login', {
            templateUrl: 'app/pages/login.html',
            controller: 'loginController as login'
        })
        .when('/carrinho', {
            templateUrl: 'app/pages/cart.html',
            controller: 'cartController as page'
        })
        .when('/produtos', {
            templateUrl: 'app/pages/shop.html',
            controller: 'shopController as page'
        })
        .when('/ofertas', {
            templateUrl: 'app/pages/offers.html',
            controller: 'offersController as page'
        })
        .when('/pagamento', {
            templateUrl: 'app/pages/payout.html',
            controller: 'payoutController as page'
        })
        .when('/favoritos', {
            templateUrl: 'app/pages/fav.html',
            controller: 'favController as page'
        })
        .when('/configuracoes', {
            templateUrl: 'app/pages/config.html',
            controller: 'configController as page'
        });
});

iBuy.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if ($rootScope.logged == false || $rootScope.logged == null) {
            // no logged user, we should be going to #login
            if (next.templateUrl == "app/pages/login.html") {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/login");
            }
        }
    });
});

// create the controller and inject Angular's $scope
iBuy.controller('mainController', function($scope, $http, $rootScope, $location) {
    var _self = this;
    this.name = 'iBuy';

    updateVal();
    window.addEventListener('resize', function() { updateVal(); if (!$scope.$$phase) {$scope.$apply(); } });
    function updateVal() { $scope.$fullScreenMinusHeader = window.innerHeight - 50 + 'px'; }
    
    $scope.cards=cards;
    
    $scope.goTo = function(page) {
        $location.path(page);
        return page;
    }

    $scope.Store = store;

    $scope.fav = [];
    $scope.cart = [];
    $scope.cartItem = {};

    //favorite methods
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
    
    //populating favorites
    favItem($scope.Store[0]);
    
    //menu status and methods
    $scope.menuStatusTypes= { close:'menu-close', open:'menu-open'};
    $scope.openMenu = openMenu;
    
    function openMenu() {
        $scope.menuStatus = $scope.menuStatusTypes.open;
        return $scope.menuStatus;
    }

    $scope.closeMenu = closeMenu;

    function closeMenu() {
        $scope.menuStatus = $scope.menuStatusTypes.close;
        return $scope.menuStatus;
    }
    //init menu status
    closeMenu();

    //populating cart
    addItem($scope.Store[0]);
    addItem($scope.Store[0]);
    addItem($scope.Store[1]);
    
    //Cart methods
    //add item to cart
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

    //remove item from cart
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
    //calculate total value from cart itens
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.qty * item.cost;
        })
        return total;
    }

    // FIX: não funcionou no git-pages

    // $http.get('/data/data.json')
    //     .success(function(data, status, headers, config) {
    //         $scope.userLoginData = data;
    //     })
    //     .error(function(data, status, headers, config) {
    //         console.log(data)
    //     });
    
    //login data and method
    //data os correct login
    $scope.userLoginData={ "name": "test", "pass": "1234"};
    // var to save input data
    $scope.user =  {};
    $scope.logout = function() {
        $rootScope.logged = false;
        $location.path("/");
        console.log($rootScope)
    };

    // navigaton control method BACK
    $scope.$back = function() {
        window.history.back();
    };
});

iBuy.controller('loginController', function($scope, $rootScope, $location) {
    var _self = this;
    
    // class to animate by condition
    _self.class = 'on';
    //var to check save if is something wrong
    _self.wrong = false;
    
    // console.log($rootScope);
    //method to check login username and password
    _self.$validateUser = function() {
        // saves the kind of error;
        var allOk = validateUser($scope.user.name, $scope.user.pass);

        if (allOk.user && allOk.pass) {
            $rootScope.logged = true;
            $location.path("/");
            _self.wrong = false;
        } else {
            _self.wrong = true;
            _self.class = 'on error';
            _self.errorMessage = allOk.user ? 'Password incorreto, coloque: ' + $scope.userLoginData.pass : 'Username incorreto, coloque: ' + $scope.userLoginData.user;
        }
        return !_self.wrong;
    }
    _self.validateUser=validateUser;
    function validateUser(username, password){
         var allOk = { user: false, pass: false }
        
        console.log(username, '$scope.userLoginData.user',$scope.userLoginData)
        //cheking user
        if (username == $scope.userLoginData.name) {
            allOk.user = true;
        }
        
        console.log(password, $scope.userLoginData.pass)
        //cheking pass
        if (password == $scope.userLoginData.pass) {
            allOk.pass = true;
        }
        return allOk;
    }

});

iBuy.controller('cartController', function($scope) {

    var _self = this;
    _self.name = 'Carrinho';

    updateVal(); 
    window.addEventListener('resize', function() {updateVal(); if (!$scope.$$phase) {$scope.$apply(); } });

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
    //populate ofertas
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