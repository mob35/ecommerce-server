(function () {
  'use strict';

  describe('Paymentmasters Route Tests', function () {
    // Initialize global variables
    var $scope,
      PaymentmastersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PaymentmastersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PaymentmastersService = _PaymentmastersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('paymentmasters');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/paymentmasters');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PaymentmastersController,
          mockPaymentmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('paymentmasters.view');
          $templateCache.put('modules/paymentmasters/client/views/view-paymentmaster.client.view.html', '');

          // create mock Paymentmaster
          mockPaymentmaster = new PaymentmastersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Paymentmaster Name'
          });

          // Initialize Controller
          PaymentmastersController = $controller('PaymentmastersController as vm', {
            $scope: $scope,
            paymentmasterResolve: mockPaymentmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:paymentmasterId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.paymentmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            paymentmasterId: 1
          })).toEqual('/paymentmasters/1');
        }));

        it('should attach an Paymentmaster to the controller scope', function () {
          expect($scope.vm.paymentmaster._id).toBe(mockPaymentmaster._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/paymentmasters/client/views/view-paymentmaster.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PaymentmastersController,
          mockPaymentmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('paymentmasters.create');
          $templateCache.put('modules/paymentmasters/client/views/form-paymentmaster.client.view.html', '');

          // create mock Paymentmaster
          mockPaymentmaster = new PaymentmastersService();

          // Initialize Controller
          PaymentmastersController = $controller('PaymentmastersController as vm', {
            $scope: $scope,
            paymentmasterResolve: mockPaymentmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.paymentmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/paymentmasters/create');
        }));

        it('should attach an Paymentmaster to the controller scope', function () {
          expect($scope.vm.paymentmaster._id).toBe(mockPaymentmaster._id);
          expect($scope.vm.paymentmaster._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/paymentmasters/client/views/form-paymentmaster.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PaymentmastersController,
          mockPaymentmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('paymentmasters.edit');
          $templateCache.put('modules/paymentmasters/client/views/form-paymentmaster.client.view.html', '');

          // create mock Paymentmaster
          mockPaymentmaster = new PaymentmastersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Paymentmaster Name'
          });

          // Initialize Controller
          PaymentmastersController = $controller('PaymentmastersController as vm', {
            $scope: $scope,
            paymentmasterResolve: mockPaymentmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:paymentmasterId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.paymentmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            paymentmasterId: 1
          })).toEqual('/paymentmasters/1/edit');
        }));

        it('should attach an Paymentmaster to the controller scope', function () {
          expect($scope.vm.paymentmaster._id).toBe(mockPaymentmaster._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/paymentmasters/client/views/form-paymentmaster.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
