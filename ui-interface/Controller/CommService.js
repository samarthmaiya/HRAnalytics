var app=angular.module('App');

app.service('CommService', function($http,$rootScope) {
    this.getNotification=(id)=>{
        return $http.get($rootScope.url+"/getNotification/"+id);
    }
    this.getDataFromTemp=(param)=>{
      return $http.get($rootScope.url+"/"+param);
  }
  this.getDataFromTemp1=(param)=>{
    return $http.get(param);
}
  this.postDataFromTemp=(param,data)=>{
    return $http.post($rootScope.url+"/"+param,JSON.stringify(data));
}
    this.uploadFile=(fb,con)=>{
        return $http.post($rootScope.url+"/upload_csv",fb,con);
    }
    this.getUserInfoById=(param)=>{
        return $http.get($rootScope.url+"/get-user-info/"+param);
    }
    this.indexDataToElastic=()=>{
        return $http.get($rootScope.url+"/indexDataInElastic");
    }
    this.getDataEducationVsLimitBal=()=>{
        return $http.get($rootScope.url+"/getDataEducationVsLimitBal");
    }
    this.getUserInfoByIdInElastic=(param)=>{ 
        if(param==undefined){
             return $http.get($rootScope.url+"/getAllDataFromElastic");
        }else{
            return $http.get($rootScope.url+"/searchNameAndId/"+param);
        }
        
    }
    this.myFunc = function (x) {
      return x.toString(16);
    }
  });

  app.service('auth',function(store){
      this.unuthenticate=()=>{
        store.set('role');
        store.set('user');
        return true;
      }
      this.getHrRole=()=>{
        return store.get('hr');
      }
  });


  app.service('util',function($rootScope){
    
    this.showNotification=(data)=>{
      $rootScope.notificatioData=data;
      document.getElementById('notificationId').style.display='block';
      setTimeout(function(){ document.getElementById('notificationId').style.display='none'; }, 5000);
      return true;
    }
});
 

  app.service('store', ['$window', function ($window) {

    return {
  
      check: function (key) {
        if ($window.localStorage[key]) {
          return true;
        }
        return false;
      },
  
      get: function (key) {
        if ($window.localStorage[key]) {
          var element = angular.fromJson($window.localStorage[key]);
          return JSON.parse(element);
        }
        return false;
      },
  
      set: function (key, val) {
  
        if (val === undefined) {
          $window.localStorage.removeItem(key);
        } else {
          $window.localStorage[key] = angular.toJson(JSON.stringify(val));
        }
        return $window.localStorage[key];
      }
    }
  }]);