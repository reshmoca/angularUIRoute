'use strict';

describe('Controller: TodogridviewCtrl', function () {

  // load the controller's module
  beforeEach(module('angularToolsUiApp'));

  var TodogridviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodogridviewCtrl = $controller('TodogridviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
