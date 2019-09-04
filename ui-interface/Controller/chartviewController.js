var app=angular.module('App');
app.controller('chartviewController',function($scope,CommService,$rootScope) {
    $scope.message = 'Hello Welcome To Chart Page';
     $scope.searchData=()=>{
        
            $rootScope.isLoading=true;
            CommService.getDataEducationVsLimitBal().then(function(response) {
                $scope.datas = response.data;
                $rootScope.isLoading=false;
                var categories=[];
                var data=[];
                angular.forEach($scope.datas,function(value,key){
                    angular.forEach(value,function(v1,k1){
                        if(k1=='education'){
                            categories.push(v1);
                        }else{
                           data.push(v1);
                        }
                    });
                });
                
                Highcharts.chart('container', {
                    chart: {
                      type: 'cylinder',
                      options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                      }
                    },
                    title: {
                      text: 'Education vs Limit_Balance'
                    },
                    plotOptions: {
                      series: {
                        depth: 25,
                        colorByPoint: true
                      }
                    },
                   
                      yAxis: {
                        title: {
                          text: '<b>Limit Balance</b>'
                        }
                      },
                    xAxis: {
                        categories: ['others', 'unknown', 'high school', 'university', 'graduate school'],
                        title: {
                            text: '<b>Education</b>'
                          }
                    },
                    series: [{
                        data: [310000, 840000, 19280000, 67420000, 79230000],
                      name: 'Cylinders',
                      showInLegend: false,
                    }]
                  });



              });
    }
    $scope.searchData();
    $rootScope.isLoading=false; 
    

});