angular.module("nativeIP").controller("categoriesController", function ($scope, category, categories, categoriesAPI, $location) {

    if(category){
        $scope.category = category.data;
    }

    if(categories){
        $scope.categories = categories.data;

        $scope.deleteCategories = function (categories){
            categories.filter(function (category){
                if (category.selected){
                    categoriesAPI.deleteCategories(category.id).then(function (response){
                        loadCategories();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadCategories = function () {
            categoriesAPI.getCategories().then(function (response) {
                $scope.categories = response.data;
                $scope.checkCategorySelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkCategorySelected = function () {
            $scope.hasCategorySelected = $scope.categories.some(function (category) {
                return category.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addCategory = function (category) {
        categoriesAPI.saveCategories(category).then(function (response){
            delete $scope.category;
            $scope.categoryForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/categories");
        });
    };

    $scope.editCategory = function (category) {
        categoriesAPI.updateCategory(category.id, category).then(function (response){
            delete $scope.category;
            $scope.categoryForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/categories");
        });
    };
});