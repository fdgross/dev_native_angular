angular.module("nativeIP").controller("apisController", function ($scope, api, apis, apisCalls, apisAPI, apisCallsAPI, $location) {
    
    if(api){
        $scope.api = api.data;
        if(!$scope.api.headers){
            $scope.api.headers = [];
            $scope.api.headers.push({key: "", value: ""});
        }
    }

    if(apis){
        $scope.apiCallNew = {};
        $scope.apis = apis.data;

        $scope.defaultEvents = [
            {event: "ringing", name: "Ramal tocando"},
            {event: "answer", name: "Ligação atendida"},
            {event: "hangup", name: "Ligação desligada"},
            {event: "ringnoanswer", name: "Ligação perdida"},
            {event: "transfer", name: "Ligação transferida"},
            {event: "pickup", name: "Ligação capturada"},
            {event: "parked", name: "Ligação estacionada"},
            {event: "enterQueue", name: "Entrada na fila"},
            {event: "queueExit", name: "Saída da fila"},
            {event: "custom", name: "Customizado"},
        ];
        

        $scope.verbs = [
            'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
        ];

        $scope.deleteApis = function (apis){
            apis.filter(function (api){
                if (api.selected){
                    apisAPI.deleteApis(api.id).then(function (response){
                        loadApis();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadApis = function () {
            apisAPI.getApis().then(function (response) {
                $scope.apis = response.data;
                $scope.checkApiSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkApiSelected = function () {
            $scope.hasApiSelected = $scope.apis.some(function (api) {
                return api.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    if(apisCalls){
        $scope.apiCalls = apisCalls.data;
        $scope.apiCalls.forEach(function(apiCall){
            apiCall.fields = angular.fromJson(apiCall.body);
            delete apiCall.body;
            $scope.apis.filter(function (api){
                if (api.id === apiCall.apiId){
                    apiCall.apiName = api.name;
                }
            });
        });
    }

    $scope.addApi = function (api) {
        apisAPI.saveApis(api).then(function (response){
            delete $scope.api;
            $scope.apiForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/apis");
        });
    };

    $scope.editApi = function (api) {
        apisAPI.updateApi(api.id, api).then(function (response){
            delete $scope.api;
            $scope.apiForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/apis");
        });
    };

    $scope.editApiCall = function (apiCall) {
        apiCall.action = "edit";
        $scope.apiCallNew = apiCall;
    };

    $scope.createApiCall = function() {
        $scope.apiCallNew = {action: "new"};
    };

    $scope.saveApiCall = function (apiCall) {
        $scope.apis.filter(function (api){
            if (api.id === apiCall.apiId){
                apiCall.apiName = api.name;
            }
        });
        apiCall.body = JSON.stringify(apiCall.fields);
        if(apiCall.action === 'new'){
            if(!$scope.apiCalls){
                $scope.apiCalls = [];
            }
            var newApiCall = apisCallsAPI.saveApisCalls(apiCall);
            apiCall.id = newApiCall.id;
            $scope.apiCalls.push(apiCall);
        }
        else{
            apisCallsAPI.updateApiCall(apiCall.id, apiCall);
        }
        $scope.apiCallNew = {};
    };

    $scope.removeApiCall = function (apiCalls, lineId, apiCall) {
        apiCalls.splice( lineId, 1 );
        apisCallsAPI.deleteApisCalls(apiCall.id);
    };

    $scope.addFieldToBody = function (apiCall) {
        if(!apiCall.fields){
            apiCall.fields = [];
        }

        apiCall.fields.push({key: "", value: ""});
    };
    
    $scope.removeFieldFromBody = function (fields, lineId) {
        fields.splice( lineId, 1 );
    };
});