describe('iBuy-app.js', function() {
    
    var mainController, scope;
   
    beforeEach(module('iBuy'));

    beforeEach(inject(function($rootScope, $controller) {
   
        scope = $rootScope.$new();
        mainController = $controller('mainController', { $scope: scope });
   
    }));
    
    it('says name', function() {
        expect(mainController.name).toEqual("iBuy");
    });

    it('menu status', function() {
        scope.openMenu();
        expect(scope.menuStatus).toEqual(scope.menuStatusTypes.open);
        scope.closeMenu();
        expect(scope.menuStatus).toEqual(scope.menuStatusTypes.close);
    });
    
    it('fav item',function(){
        //checando item favorito
        expect(scope.fav[0]).toEqual(scope.Store[0]);
        //adicionando item favorito
        scope.favItem(scope.Store[1]);
        //checando item favorito
        expect(scope.fav[1]).toEqual(scope.Store[1]);
        //removendo item favorito
        scope.favItem(scope.Store[1]);
        //checando item favorito
        expect(scope.fav[1]).toEqual(undefined);
    });

    it('cart item',function(){
        //objeto item no carrinho
        expect(scope.cartItem[scope.Store[0].key_name]).toEqual(scope.Store[0]);
        //quantia do item
        expect(scope.cartItem[scope.Store[0].key_name].qty).toEqual(2);
        //adicionando item
        scope.addItem(scope.Store[0]);
        expect(scope.cartItem[scope.Store[0].key_name].qty).toEqual(3);
        //removendo item
        scope.removeItem(scope.Store[0]);
        expect(scope.cartItem[scope.Store[0].key_name].qty).toEqual(2);
    });
});

describe('iBuy-app.js-login', function() {
    
    var mainController, scope;
   
    beforeEach(module('iBuy'));

    beforeEach(inject(function($rootScope, $controller) {
   
        scope = $rootScope.$new();
        loginController = $controller('loginController', { $scope: scope });
        
        scope.user={ name:'test', pass:1234 };
        
        scope.userLoginData={ name:'test', pass:1234 };
        console.log('scope.loginData',scope.loginData)
    }));
    
    it('start-wrong', function() {
        expect(loginController.wrong).toEqual(false);
    });
    it('validate', function() {

        console.log('scope.loginData',scope.loginData)
        var validationObject=loginController.validateUser('test',  1234 );
        expect(validationObject.user).toEqual(true);
        expect(validationObject.pass).toEqual(true);
    });


});