var app=angular.module('App');
app.controller('SearchController',function($scope,CommService,$rootScope,store) {
    $scope.message = 'Hello Welcome To Search Page';
    $scope.skilldata="";
    $scope.skillscore="";
    $scope.searchValue=store.get('skill');//$rootScope.employeeSkill;
    $rootScope.countNotification=0;
    
    $scope.searchData=()=>{
      $scope.skillFinalData=[];
            CommService.getDataFromTemp("rleventtech/"+$scope.searchValue).then(function(response) {
              $scope.skilldata= response.data.skills;
              $scope.skillscore=response.data.score;
              angular.forEach($scope.skilldata, function(value, key) {
                $scope.skillFinalData.push({'skill':value,'skillscore':response.data.score[key]
                                          ,'jobId':response.data.Job_Id[key] ,'jobdescription':response.data.jobdescription[key]});
              });
              
              });
    }

    $scope.getNotification=()=>{
      CommService.getNotification(parseInt(store.get('userId'))).then(function(response) {
        console.log(response.data);
      })
    }

     $scope.searchData();
     $scope.getNotification();
   


});

app.controller('CourseController',function ($scope) {
  $scope.hello="course Controler is working ";
  console.log("Hello Course Controller");
});
app.controller('SearchForRecomController',function ($scope,CommService,$rootScope,store) {
  $scope.message = 'Hello Welcome To Search Page';
  $scope.skilldata="";
  $scope.skillscore="";
  
  $scope.searchData=()=>{
    $scope.skillFinalData=[];
         
          CommService.getDataFromTemp("newTech/"+parseInt(store.get('userId'))).then(function(response) {
            $scope.skilldata= response.data.skill;
            $scope.skillscore=response.data.skillscore;
            angular.forEach($scope.skilldata, function(value, key) {
              $scope.skillFinalData.push({'skill':value,'skillscore':response.data.skillscore[key]});
            });
            
            });
  }
   $scope.searchData();
});
app.controller('NotificationController',function ($scope,CommService,store) {
  $scope.hello="course Controler is working ";
  console.log("Hello Course Controller");
  $scope.noti_data='';
  $scope.getNotification=()=>{
    CommService.getNotification(parseInt(store.get('userId'))).then(function(response) {
      $scope.noti_data=[{'project_Id':response.data.project_Id['0'],'job':response.data.job['0']}];
      console.log(response.data);
    });
  }
  $scope.getNotification();
});