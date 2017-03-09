angular.module('app.albumViewer', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('AlbumViewerCtrl', function ($scope, $rootScope, $location, ModalService, Pics, Albums, Collage, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    var data;

    function updateState(album) {
      return album;
    }

    $scope.individualAlbumPhotos = updateState($rootScope.albumID);

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

    $scope.openMenu = function ($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.show = function (index) { //takes the index of the image clicked and sets an object with the images information
      Collage.set({
        image1: $scope.individualAlbumPhotos.album.imagesPath[index],
        image2: $scope.individualAlbumPhotos.album.imagesPath[index]
      });
      ModalService.showModal({
        templateUrl: 'modal.html',
        controller: "ModalController"
      }).then(function (modal) {
        modal.element.modal();

      });
    };

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
      $location.path('/home')
    }

    $scope.redirectToAlbumsView = function() {
      $location.path('/album')
    }

    $scope.redirectToShared = function() {
      $location.path('/shared');
    }

    $scope.logoff = Auth.signout;
  });
