var app = angular.module('athleteApp', ['ui.router']);

// route configuration
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/form/basic');

  $stateProvider
  .state('form', {
    url: '/form',
    templateUrl: 'form.html',
    controller: 'formController'
  })
    // nested states
    // each of these sections will have their own view
    // url will be nested (/form/basic)
    .state('form.basic', {
      url: '/basic',
      templateUrl: 'form-basic.html',
    })

    // url will be /form/about
    .state('form.about', {
        url: '/about',
        templateUrl: 'form-about.html'
    })

    // url will be /form/socialMedia
    .state('form.socialMedia', {
        url: '/socialMedia',
        templateUrl: 'form-socialMedia.html'
    })
  .state('preview', {
    url: '/preview',
    templateUrl: 'preview.html',
    controller: 'previewController'
  })
  .state('receive', {
    url: '/receive',
    template: "<h3>Thank you for filling out. We will contact you shortly.</h3>"
  })
});

// registerd a service to pass the form data to preview view
app.factory('previewService', function() {
  let userData = {};

  const addUserData = function(data) {
    userData = data;
  };

  const getUserData = function() {
    return userData;
  }
  return {
      addUserData: addUserData,
      getUserData: getUserData
  };

});

// form controller
app.controller('formController', function($scope, previewService) {
  $scope.user = previewService.getUserData();

  $scope.processForm = function() {
    previewService.addUserData($scope.user);
  };
});

app.controller('previewController', function($scope, previewService, $http, $state) {
  $scope.previewUser = previewService.getUserData();

  $scope.onSubmit = function() {
    $http.post('/submit', $scope.previewUser)
      .then(function success() {
        $state.go("receive");
      });
  };

});
