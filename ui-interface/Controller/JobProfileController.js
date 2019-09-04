var app=angular.module('App');


app.controller('JobProfileController', function ($scope, CommService, $timeout, $rootScope, store, $state, util) {
    $scope.hello = "course Controler is working ";

    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
    $scope.applyForJob = () => {
        util.showNotification("Thank You For Apply for this role .we will get back tou you .");
        $state.go('search');
    }
});