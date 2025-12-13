
var food = [];
var activeFood = 0;

//1.  Define angular app
var app=angular.module("browseDataApp",[]);

app.controller('browseDataControler',function($scope,$http){


    $scope.get_records=function(){
        $http({
            method:"get",
            url:libraryURL+"/get-records"
        }).then(function(response){
                    console.log("Response:", response);  // Add this
            if(response.data.msg==="SUCCESS"){
                food=response.data.foodList;
                $scope.obj=food[activeFood];
            }

        },function(error){
            console.error("Error:", error);
            alert(error);
        });
    }

    $scope.get_records();

    $scope.changeFood=function(direction){
            activeFood+=direction;
            
            $scope.obj=food[activeFood];
           
            $scope.showHide();
        };
        $scope.showHide=function(){
            $scope.hidePrev=(activeFood===0)?true:false;
            $scope.hideNext=(activeFood===food.length-1)?true:false;
        }




});