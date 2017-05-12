angular.module('app', ['app.landing',
    'app.factory',
    'app.home',
    'app.album',
    'app.settings',
    'ui.grid',
    'angularModalService',
    'ngRoute',
    'ngAnimate'
  ])
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
    $scope.url = Collage.get(); //gets the image url from the Collage factory
    $scope.close = function (result) {
      close(result, 500);
    };
  })
  .controller('UploadCtrl', function ($scope, close, Pics, Collage) { // takes the files from the dialogbox and sends it to server
    
    var fd = new FormData();
    $scope.uploadFile = function (fileType, files) {
      fd.append(fileType, files[0])
    }
    $scope.connection = function () {
      Pics.sendPhotos(fd)
      .then(function () {
        Collage.getFetcher()();
      });
      $scope.close = function () {
        close(null,500);
      }();
    }
  })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
        $location.path('/');
      }
    });
  });
