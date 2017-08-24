(function () {
  'use strict';

  describe('Addressmasters Route Tests', function () {
    // Initialize global variables
    var $scope,
      AddressmastersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AddressmastersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AddressmastersService = _AddressmastersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('addressmasters');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/addressmasters');
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
          AddressmastersController,
          mockAddressmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('addressmasters.view');
          $templateCache.put('modules/addressmasters/client/views/view-addressmaster.client.view.html', '');

          // create mock Addressmaster
          mockAddressmaster = new AddressmastersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Addressmaster Name'
          });

          // Initialize Controller
          AddressmastersController = $controller('AddressmastersController as vm', {
            $scope: $scope,
            addressmasterResolve: mockAddressmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:addressmasterId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.addressmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            addressmasterId: 1
          })).toEqual('/addressmasters/1');
        }));

        it('should attach an Addressmaster to the controller scope', function () {
          expect($scope.vm.addressmaster._id).toBe(mockAddressmaster._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/addressmasters/client/views/view-addressmaster.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AddressmastersController,
          mockAddressmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('addressmasters.create');
          $templateCache.put('modules/addressmasters/client/views/form-addressmaster.client.view.html', '');

          // create mock Addressmaster
          mockAddressmaster = new AddressmastersService();

          // Initialize Controller
          AddressmastersController = $controller('AddressmastersController as vm', {
            $scope: $scope,
            addressmasterResolve: mockAddressmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.addressmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/addressmasters/create');
        }));

        it('should attach an Addressmaster to the controller scope', function () {
          expect($scope.vm.addressmaster._id).toBe(mockAddressmaster._id);
          expect($scope.vm.addressmaster._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/addressmasters/client/views/form-addressmaster.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AddressmastersController,
          mockAddressmaster;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('addressmasters.edit');
          $templateCache.put('modules/addressmasters/client/views/form-addressmaster.client.view.html', '');

          // create mock Addressmaster
          mockAddressmaster = new AddressmastersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Addressmaster Name'
          });

          // Initialize Controller
          AddressmastersController = $controller('AddressmastersController as vm', {
            $scope: $scope,
            addressmasterResolve: mockAddressmaster
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:addressmasterId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.addressmasterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            addressmasterId: 1
          })).toEqual('/addressmasters/1/edit');
        }));

        it('should attach an Addressmaster to the controller scope', function () {
          expect($scope.vm.addressmaster._id).toBe(mockAddressmaster._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/addressmasters/client/views/form-addressmaster.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
