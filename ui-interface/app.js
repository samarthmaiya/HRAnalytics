angular.module("App",['main']);
var app =angular.module("main",['ui.router','angular-page-loader']);
//var app1=angular.module('App');
app.controller('appControler',function($scope,$state,CommService,$timeout,$rootScope,store,auth) {
    $scope.hello="MainApp"; 
    
    $scope.checkRole=()=>{
        if(!store.get('role')==false){
            return true;
        }else{
            //$state.go('login');
            return false;
        }
       
    }
    $rootScope.checkRoleHr=function() {
        if(store.get('role')=='employee'){
           // $state.go("search");
           document.getElementById('employee').style.display='flex';
           document.getElementById('hrtab').style.display='none';
           return true;
        }
        document.getElementById('hrtab').style.display='flex';
        document.getElementById('employee').style.display='none';
        return true;
    }
    $rootScope.checkRoleHr();
    $scope.requestForLogout=()=>{
        auth.unuthenticate();
    }
});
app.run(function($rootScope,store,$transitions,$state) {
    $rootScope.url='http://10.148.135.217:3134';
    console.log("It is working");
    $rootScope.employeeSkill="";
//         $rootScope.$on('$stateChangeSuccess', 
// function(event, toState, toParams, fromState, fromParams){ 
//     console.log("Hello Pat"+store);
// });


$transitions.onSuccess({}, function() {
    if(!store.get('user')){
        $state.go('login');
    }
   
  });

});
app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
  
//     $rootScope.$on('$stateChangeStart', 
// function(event, toState, toParams, fromState, fromParams){ 
//     console.log(store);
// });

$urlRouterProvider.otherwise('/login');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: './template/login.html',
            controller: 'LoginController'
        })

        // SEARCH PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('search', {
            url: '/search',
            templateUrl: './template/search.html',
            controller: 'SearchController'      
        })
        // Recomendation By Employee
        .state('employee-recomendation', {
            url: '/employee-recomendation',
            templateUrl: './template/SearchForRecomendation.html',
            controller: 'SearchForRecomController'      
        })
        .state('chartview', {
            url: '/chartview',
            templateUrl: './template/chartview.html',
            controller: 'chartviewController'      
        })
        // JOB Profile
        .state('jobprofile', {
            url: '/jobprofile',
            templateUrl: './template/jobprofile.html',
            controller: 'JobProfileController'      
        })
         // JOB Profile
         .state('employeecourse', {
            url: '/employee-course',
            templateUrl: './template/employeecourse.html',
            controller: 'CourseController'      
        })
        //Apply Employee
        .state('employee', {
            url: '/employee?skills',
            templateUrl: './template/employee.html',
            controller: 'EmployeeController'      
        })
        //Employee Open
        .state('employee_open', {
            url: '/employee_open?skills,projectId',
            templateUrl: './template/employeeOpen.html',
            controller: 'EmployeeOpenController'      
        })
         //Apply Open Project
         .state('open-project', {
            url: '/open-project',
            templateUrl: './template/openproject.html',
            controller: 'OpenProjectController'      
        })
          //Apply Open Project
          .state('Notification', {
            url: '/employee-notification',
            templateUrl: './template/employee_notification.html',
            controller: 'NotificationController'      
        })
         // HR SEARCH STATE
         .state('hrsearch', {
            url: '/hrsearch',
            templateUrl: './template/hrsearch.html',
            controller: 'HrSearchController'      
        });
        // if(window.history && window.history.pushState){
        //     $locationProvider.html5Mode({
        //         enabled: true,
        //         requireBase: true
        //        });
        //   }
        
});
