angular.module('app.shared', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('SharedCtrl', function ($scope, $rootScope, $location, ModalService, Pics, Shared, Albums, Collage, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    $rootScope.sharedAlbums = []; // stores shared album objects in rootscope
    $rootScope.sharedAlbumID = null; // stores album id for sharedViewer in rootscope
    var data;

    function buildToggler(componentId) {  // side menu toggler
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

    $scope.openMenu = function ($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.fetcher = function() {
      Shared.fetcher()
      .then(function(results) {
        $rootScope.sharedAlbums = results;
      })
    };

    $scope.fetcher();

    $scope.updateAlbumID = function (album) { // adds or updates sharedAlbumID scope variable
      $rootScope.sharedAlbumID = album;
    }

    $scope.show2 = function () { //show the uplaod file modal
      ModalService.showModal({
        templateUrl: 'uploader.html',
        controller: "UploadCtrl"
      }).then(function (modal) {
        modal.element.modal();
      });
    };

    $scope.settings = function() {
      $location.path('/settings');
    }

    $scope.redirectToImageView = function() {
      $location.path('/home');
    }

    $scope.redirectToAlbumsView = function() {
      $location.path('/album');
    }

    $scope.redirectToAlbumViewerView = function() {
      $location.path('/sharedViewer');
    }

    $scope.redirectToShared = function() {
      $location.path('/shared');
    }

    $scope.logoff = Auth.signout;

    $scope.close = function () {
      $mdDialog.hide();
    };

  });
