(function () {
  'use strict';

  describe('Paymentmasters List Controller Tests', function () {
    // Initialize global variables
    var PaymentmastersListController,
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

      // create mock article
      mockPaymentmaster = new PaymentmastersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Paymentmaster Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Paymentmasters List controller.
      PaymentmastersListController = $controller('PaymentmastersListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockPaymentmasterList;

      beforeEach(function () {
        mockPaymentmasterList = [mockPaymentmaster, mockPaymentmaster];
      });

      it('should send a GET request and return all Paymentmasters', inject(function (PaymentmastersService) {
        // Set POST response
        $httpBackend.expectGET('api/paymentmasters').respond(mockPaymentmasterList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.paymentmasters.length).toEqual(2);
        expect($scope.vm.paymentmasters[0]).toEqual(mockPaymentmaster);
        expect($scope.vm.paymentmasters[1]).toEqual(mockPaymentmaster);

      }));
    });
  });
}());
