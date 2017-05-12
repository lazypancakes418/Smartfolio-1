angular.module('app.settings', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('SettingsCtrl', function ($scope, $mdSidenav, Auth, $location) {
    $scope.pageClass = 'page settings';
    $scope.home = function () {
      $location.path('/home');
    }
    $scope.toggleLeft = buildToggler('left');
     function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      }
    };
    $scope.logoff = Auth.signout;
  });