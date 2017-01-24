angular.module('app.landing', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('LandCtrl', function ($scope, $location, $window, $mdDialog, Auth, $rootScope) {
    $rootScope.back = "landing"
    $scope.user = {}
    $scope.login = function () {

      Auth.login($scope.user)
        .then(function (token) {
        $window.localStorage.setItem('com.smartfolio',token)
        $location.path('/home');
      })
        .catch(function (error) {
          console.error(error)
        })
    }

    $scope.showDialog = function ($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        template: `
                <md-dialog aria-label="List dialog">
                 <md-dialog-content>
                    <form id="pop">
                        <h1><Smartfolio></Smartfolio></h1>
                        <md-input-container>
                            <label>EmailAddress</label>
                            <input type="email" ng-model="user.username" />
                        </md-input-container>
                        <md-input-container>
                            <label>Password</label>
                            <input type="password" ng-model="user.password" />
                        </md-input-container>
                        <md-dialog-actions>
                            <md-button ng-click="closeDialog()" class="md-primary">
                              Sign Up
                            </md-button>
                        </md-dialog-actions>
                       
                    </form>
                 </md-dialog-content>
                </md-dialog>`,
        controller: DialogController
      });
      
      function DialogController($scope, $mdDialog) {
        $scope.user = {};
        $scope.closeDialog = function () {
          console.log($scope.user)
          $http.defaults.headers.common['username'] = $scope.username
          Auth.register($scope.user)
            .then(function (token) {
              $window.localStorage.setItem('com.smartfolio', token)
              $location.path('/home')
            })
          $mdDialog.hide();
        }
      }
    }
  })
