angular.module('app', ['app.landing',
  'app.factory',
  'app.home',
  'app.album',
  'app.settings',
  'ui.grid',
  'angularModalService',
  'ngRoute'])
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: '/app/landing/landing.html',
        controller: 'LandCtrl'
      })
      .when('/home', {
        templateUrl: '/app/home/home.html',
        controller: 'HomeCtrl',
        authenticate: true
      })
      .when('/settings', {
        templateUrl: '/app/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/album', {
        templateUrl: '/app/album/album.html',
        controller: 'AlbumCtrl',
        authenticate: true
      })

    $httpProvider.interceptors.push('AttachTokens');
  })
  .controller('ModalController', function ($scope, close, Collage) {
    $scope.url = Collage.get();
    console.log($scope.url)
    $scope.close = function (result) {
      close(result, 500);
    };
  })
  .controller('UploadCtrl', function ($scope, close, Pics) {
    var fd = new FormData();
    $scope.uploadFile = function (fileType, files) {
      fd.append(fileType, files[0])
    }
    $scope.connection = function () {
     
      Pics.sendPhotos(fd)
       $scope.close = function () {
      close(500);
    }();
    }

    
     
  })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/landing');
    
      }
    });
  });
