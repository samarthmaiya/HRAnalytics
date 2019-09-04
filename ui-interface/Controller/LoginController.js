var app=angular.module('App');
app.controller('LoginController',function($scope,CommService,$timeout,$rootScope,store,$state) {
    $scope.message = 'Hello Welcome To Home Page';
   var userData=[
       {
           'emailId':'Pranav@g.com',
           'role':'employee',
           'skill':'JAVA,OSS',
           'Id':'602000312'
       },
       {
        'emailId':'saikat@g.com',
        'role':'employee',
        'skill':'.net,Python',
        'Id':'602000312'
    },
       {
            'emailId':'ram@g.com',
            'role':'hr'
       }
    ];
    if(store.get('role')=='employee'){
        $state.go('search');
    }else{
       // $rootScope.checkRoleHr();
        $state.go('hrsearch');
        
    }

    $rootScope.userId='';


    $scope.toastHeader="Required_UserEmail_&_Password";
    $scope.toastBody="Please Enter The UserEmail And Password";


   $scope.submit=(user)=>{
            if(user.email==''||typeof user.email === 'undefined'||typeof user.password === 'undefined'){
                $('.toast').toast('show');
            }
       console.log("You have clicked"+user);
       userData.forEach((data)=>{
           if(data.emailId==user.email){
            store.set("user",data.emailId);
            store.set("role",data.role);
            if(data.role=='employee'){
                $rootScope.checkRoleHr();
                $rootScope.employeeSkill=data.skill;
                store.set("skill",data.skill);
                store.set("userId",data.Id);
                $rootScope.userId=data.Id;
                $state.go('search');
            }else{
                $rootScope.checkRoleHr();
                $state.go('hrsearch');
            } 
            return true;
           }
       });
      // store.set("user",user.email);
   }

 
   $scope.init=()=>{

   }

   $scope.init();
});