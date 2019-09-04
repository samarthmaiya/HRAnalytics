var app=angular.module('App');

app.controller('HrSearchController',function($scope,CommService,$timeout,$rootScope,$state,store) {
    $scope.message = 'Hello Welcome To Home Page';
    if(store.get('role')!='hr'){
      $state.go('login');
      var hell="hello";
      // CommService.
  }
  $scope.searchValue='';
  $scope.skillFinalData=[];
  $scope.searchData=()=>{
    $scope.skillFinalData=[];
         
          CommService.getDataFromTemp("availablejob/").then(function(response) {
            $scope.skilldata= response.data.skills;
            angular.forEach($scope.skilldata, function(value, key) {
              $scope.skillFinalData.push({'skill':value
               ,'Job_Id':response.data.Job_Id[key],'jobdescription':response.data.jobdescription[key]
              ,'joblocation_address':response.data.joblocation_address[key],'jobtitle':response.data.jobtitle[key]
            ,'Vacancies':response.data.Vacancies[key],'Position_Close_Date':response.data.Position_Close_Date[key]});
            });
            
            });
  }

  
  
 
   $scope.init=()=>{
    $scope.searchData();
   }
   $scope.init();
});

app.controller('EmployeeController',function($scope,CommService,$timeout,$rootScope,$state,store,$stateParams) {
  $scope.message = 'Hello Welcome To Home Page';
  if(store.get('role')!='hr'){
    $state.go('login');
    var hell="hello";
    // CommService.
}
$scope.skillFinalData=[];
$scope.searchData=()=>{
  $scope.skillFinalData=[];
        CommService.getDataFromTemp("rleventEmp/"+$stateParams.skills.replace("/",",")).then(function(response) {
          $scope.skilldata= response.data.primaryskill;
          angular.forEach($scope.skilldata, function(value, key) {
            $scope.skillFinalData.push({'skill':value,'score':response.data.score[key]
             ,'Employee_Name':response.data["Employee Name"][key]
            });
          });
          
          });
}
 $scope.init=()=>{
  $scope.searchData();
 }
 $scope.init();
});

app.controller('OpenProjectController',function($scope,CommService,$timeout,$rootScope,$state,store) {
  $scope.message = 'Hello Welcome To Home Page';
  if(store.get('role')!='hr'){
    $state.go('login');
    var hell="hello";
    // CommService.
}


$scope.goToEmployeeOpen=(value1,data)=>{
 if(data=='N'){
   return "<td> <a href=#!/employee_open?skills="+encodeURI(value1.skills)+"&projectId="+encodeURI(value1.projectid)+">Find Resource</a></td> ";
 }else{
   return "<td></td>";
 }
}

$scope.skillFinalData=[];
$scope.searchData=()=>{
  $scope.skillFinalData=[];
  
  
       
        CommService.getDataFromTemp("openjob/").then(function(response) {
          $scope.skilldata= response.data;
 var htmlData='';

var arr=[];

 angular.forEach(response.data, function(value, key) {
 if ( arr.indexOf(value.projectid) == -1 ) arr.push(value.projectid);
 });



 angular.forEach(arr, function(value, key) {
  var projectId=value;
  //htmlData="";
   var data=[];
  $scope.bool=false;
       angular.forEach(response.data,function(value1,key1){
                   if(projectId==value1.projectid){
                     if($scope.bool==false){
                      $scope.bool=true;
                      htmlData+="<tr><td>"+projectId+"</td><td>"+value1.jobid+"</td><td>"+value1.skills+"</td>  "+$scope.goToEmployeeOpen(value1,value1.status)+" </tr>";
                     }else{
                      htmlData+="<tr><td></td><td>"+value1.jobid+"</td><td>"+value1.skills+"</td>  "+$scope.goToEmployeeOpen(value1,value1.status)+"</tr>";
                     }
                  // data.push(value1);
                      }
            });

        });



          $("#html").html(htmlData);
         // $('#table_id').DataTable();

          





          // angular.forEach($scope.skilldata, function(value, key) {
          //   $scope.skillFinalData.push({'skill':value,'score':response.data.score[key]
          //    ,'Employee_Name':response.data["Employee Name"][key]
          //   });
          // });
          
          });
}
 $scope.init=()=>{
  $scope.searchData();
 }
 $scope.init();
});


app.controller('EmployeeOpenController',function($scope,CommService,$timeout,$rootScope,$state,store,util,$stateParams) {
  $scope.message = 'Hello Welcome To Home Page';
  if(store.get('role')!='hr'){
    $state.go('login');
    var hell="hello";
    // CommService.
}


$scope.sendNotification=(value,empId,skill)=>{
   $scope.name =value;
  var data=
  [
  {'id':empId,'name': value, 'job': skill,'project_Id':$stateParams.projectId}
  ];
     // util.showNotification(value,empId);
  CommService.postDataFromTemp("createNotification",data).then(function(response) {
    //$scope.skilldata= response.data.primaryskill;
    util.showNotification("Succesfully Send Notification To "+ $scope.name);
    // angular.forEach($scope.skilldata, function(value, key) {
    //   $scope.skillFinalData.push({'skill':value,'score':response.data.score[key]
    //    ,'Employee_Name':response.data["Employee Name"][key]
    //   });
    // });
    
    }).catch(function (err) {
      util.showNotification("Some Error to send notification ",empId);
    });
}

$scope.skillFinalData=[];
$scope.searchData=()=>{
  $scope.skillFinalData=[];
       
        CommService.getDataFromTemp("rleventEmp/"+$stateParams.skills.replace("/",",")).then(function(response) {
          $scope.skilldata= response.data.primaryskill;
          angular.forEach($scope.skilldata, function(value, key) {
            $scope.skillFinalData.push({'skill':value,'score':response.data.score[key]
             ,'Employee_Name':response.data["Employee Name"][key],'Employee_Id':response.data["Employee Number"][key]
            });
          });
          
          });
}
 $scope.init=()=>{
  $scope.searchData();
 }
 $scope.init();
});