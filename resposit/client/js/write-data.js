
var app = angular.module("addFoodsApp", []);

//2.  Create the controller and populate with the functions needed
app.controller('addFoodsCtrl', function ($scope, $http) {
    $scope.addResults = "";

    $scope.submitFood = function() {
        if($scope.name === "" || $scope.price === "" || $scope.calorie === ""|| $scope.rating === ""|| $scope.purchesed === ""|| $scope.category === "") {
            $scope.addResults = "Name, price, calories, rating, purchesed and category required";
            return;
        }

        console.log($scope.name);
        $http({
            method : "post",
            url : libraryURL + "/write-record",
            data: {
                "name": $scope.name,
                "category": $scope.category.toLowerCase(),
                "price": $scope.price,
                "calorie": $scope.calorie,
                "rating": $scope.rating,
                "purchesed": $scope.purchesed
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.addResults = "Food is added!";
                $scope.name = "";
                $scope.price = "";
                $scope.calorie = "";
                $scope.rating = "";
                $scope.purchesed = "";
                $scope.category = "";
            } else {
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    };

    $scope.startNew = function() {
        $scope.addResults = "";
    };

    $scope.clearall=function(){

                $scope.name = "";
                $scope.price = "";
                $scope.calorie = "";
                $scope.rating = "";
                $scope.purchesed = "";
                $scope.category = "";
                $scope.addResults="";

    }

    $scope.addResults = "";
});

