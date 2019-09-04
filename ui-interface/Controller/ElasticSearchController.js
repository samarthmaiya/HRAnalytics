var app=angular.module('App');
app.controller('ElasticSearchController',function($scope,CommService,$timeout,$rootScope) {
    $scope.message = 'Hello Welcome To Elastic Search Page';

    $scope.indexDataToElastic=()=>{
        $rootScope.isLoading=true;
        CommService.indexDataToElastic().then(function(response){
            $scope.searchData();
            $rootScope.isLoading=false;
        })
    }


    $scope.searchData=()=>{
        $rootScope.isLoading=true;
        CommService.getUserInfoByIdInElastic($scope.searchValue).then(function(response) {
            if($scope.searchValue!=undefined)
            $scope.userInfo = response.data;
            else
            $scope.userInfo = response.data.content;
            $('#table_id').dataTable().fnDestroy();
        $timeout(()=>{
            window.$('#table_id').DataTable({
                "scrollX": true,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                "pageLength": 10
            });
            $rootScope.isLoading=false;
        },2000)
          });
    }

    $scope.searchData();
});