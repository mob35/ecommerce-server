(function () {
  'use strict';

  describe('Paymentmasters Controller Tests', function () {
    // Initialize global variables
    var PaymentmastersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      PaymentmastersService,
      mockPaymentmaster;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _PaymentmastersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      PaymentmastersService = _PaymentmastersService_;

      // create mock Paymentmaster
      mockPaymentmaster = new PaymentmastersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Paymentmaster Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Paymentmasters controller.
      PaymentmastersController = $controller('PaymentmastersController as vm', {
        $scope: $scope,
        paymentmasterResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var samplePaymentmasterPostData;

      beforeEach(function () {
        // Create a sample Paymentmaster object
        samplePaymentmasterPostData = new PaymentmastersService({
          name: 'Paymentmaster Name'
        });

        $scope.vm.paymentmaster = samplePaymentmasterPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (PaymentmastersService) {
        // Set POST response
        $httpBackend.expectPOST('api/paymentmasters', samplePaymentmasterPostData).respond(mockPaymentmaster);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Paymentmaster was created
        expect($state.go).toHaveBeenCalledWith('paymentmasters.view', {
          paymentmasterId: mockPaymentmaster._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/paymentmasters', samplePaymentmasterPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Paymentmaster in $scope
        $scope.vm.paymentmaster = mockPaymentmaster;
      });

      it('should update a valid Paymentmaster', inject(function (PaymentmastersService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/paymentmasters\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('paymentmasters.view', {
          paymentmasterId: mockPaymentmaster._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (PaymentmastersService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/paymentmasters\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Paymentmasters
        $scope.vm.paymentmaster = mockPaymentmaster;
      });

      it('should delete the Paymentmaster and redirect to Paymentmasters', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/paymentmasters\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('paymentmasters.list');
      });

      it('should should not delete the Paymentmaster and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
