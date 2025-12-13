
var app = angular.module("GrillApp", []);

//2.  Create the controller and populate with the functions needed
//record finished
app.controller('GrillCtrl', function ($scope, $http) {
    //$scope.spells = [];
    //$scope.types = [];
    $scope.foods = [];
    $scope.categories = [];
    $scope.get_records = function() {
        $http({
            method : "get",
            url : libraryURL + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                // spellTableData = response.data.spells;
                $scope.foods = response.data.foodList;
                $scope.categories = getCategory(response.data.foodList);
                $scope.selectedcategory = $scope.categories[0];
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    };
    //redraw finished
    $scope.redrawTable = function() {
        var category = $scope.selectedcategory.value;
        console.log("redraw");
        $http({
            method : "get",
            url : libraryURL + "/get-foodsByCategory",
            params: {category: category}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
				console.log("here");
                // spellTableData = response.data.spells;
                $scope.foods = response.data.foodList;
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    }
    //delete finished
    $scope.deleteFood = function(foodID) {
        console.log(foodID);
        $http({
            method : "delete",
            url : libraryURL + "/delete-record",
            params: {foodID: foodID}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed the Delete");
        });
    }
    //edit finished
    $scope.editFood = function(foodNumber) {
        $scope.name = $scope.foods[foodNumber].name;
        $scope.price = $scope.foods[foodNumber].type;
        $scope.calorie = $scope.foods[foodNumber].effect;
        $scope.rating = $scope.foods[foodNumber].rating;
        $scope.purchesed = $scope.foods[foodNumber].purchesed;
        $scope.category = $scope.foods[foodNumber].category;
        $scope.foodID = $scope.foods[foodNumber]['_id'];

        console.log("ID set: " + $scope.foodID);
        $scope.hideTable = true;
        $scope.hideForm = false;
    }

	$scope.cancelUpdate = function() {
		$scope.hideForm = true;
		$scope.hideTable = false;

	}
    //update finsished
    $scope.updateFood = function() {
        if($scope.name === "" || $scope.price === "" || $scope.calorie === ""|| $scope.rating === ""|| $scope.purchesed === ""|| $scope.category === "") {
            $scope.addResults = "Name, price, calories, rating, purchesed and category required";
            return;
        }

        console.log("ID check: " + $scope.foodID);

        $http({
            method : "put",
             url : libraryURL + "/update-food",
             data: {
                "foodID": $scope.foodID,
                "name": $scope.name,
                "price": $scope.price,
                "calorie": $scope.calorie,
                "rating": $scope.rating,
                "purchesed": $scope.purchesed,
                "category": $scope.category.toLowerCase()
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.hideForm = true;
                $scope.hideTable = false;

                $scope.redrawTable();
                
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

    }

    $scope.get_records();
});
//
//A handy function we will use to get the list of types
function getCategory(foodTableData) {
    var categoryExists;  //This is used to prevent duplicates

    categoryArray = [{value:"", display:"ALL"}];
	
	//Loop through the JSON array returned from the server
    for(var i=0; i<foodTableData.length; i++) {
		//Check to see if the type in the ith record has already been captured
        categoryExists = categoryArray.find(function(element) {
            return element.value === foodTableData[i].category;
        })    
        if(categoryExists) {
            continue;  //If already captured, move on to next element
        } else {
			//If not captured, add the type and uppercase type to the types array
            categoryArray.push({value: foodTableData[i].category, display: foodTableData[i].category.toUpperCase()});
        }
    }

    return categoryArray
}
