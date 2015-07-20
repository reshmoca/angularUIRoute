'use strict';

describe('Controller: TodogridCtrl', function () {

  // load the controller's module
  beforeEach(module('angularToolsUiApp'));

  var TodogridCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodogridCtrl = $controller('TodogridCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
