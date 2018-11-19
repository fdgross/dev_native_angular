angular.module("nativeIP").controller("customRulesController", function ($scope, ivr, ivrs, ivrsAPI, queues, peers, $location) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    
    $scope.modelCommands = {
        selected: null,
        allAllowedTypes: ['queue', 'condition', 'timeCondition', 'hangup', 'goto', 'dial', 'set', 'playback', 'read', 'custom'],
        conditionAllowedTypes: ['queue', 'hangup', 'goto', 'dial', 'set', 'playback', 'read', 'custom'],
        noneAllowedTypes: ['none'],
        type: 'commands',
        noneType: 'none',
        lists: {
            "commands": [
                {type: "queue", name: "Chamar fila"},
                {type: "condition", name: "Condição", conditionGroups: [{conditionGroup: [{conditionVariable: "", conditionOperator: "", conditionValue: "", logicalOperator: ""}], logicalOperator: ""}], thenCommand: []},
                {type: "timeCondition", name: "Condição com horário", dows:{mon: {name: "Seg", checked: false}, tue: {name: "Ter", checked: false}, wed: {name: "Qua", checked: false}, thu: {name: "Qui", checked: false}, fri: {name: "Sex", checked: false}, sat: {name: "Sab", checked: false}, sun: {name: "Dom", checked: false}}, startDay: "", endDay: "", startMonth: "", endMonth: "", startTime: "", endTime: "",thenCommand: []},
                {type: "hangup", name: "Desligar"},
                {type: "goto", name: "Desvio"},
                {type: "dial", name: "Discar"},
                {type: "set", name: "Setar variável"},
                {type: "playback", name: "Tocar áudio"},
                {type: "read", name: "Tocar áudio e capturar dígitos"},
                {type: "custom", name: "Personalizado"}
            ],
            "definition": []
        },
    };

    if(ivr){
        $scope.customRule = ivr.data;
        angular.forEach($scope.customRule.IvrDetails, function(detail){
            var objDetail = {type: detail.command, label: detail.line};
            var objParameters = JSON.parse(detail.parameters);
            switch(detail.command){
                case "queue":
                    objDetail.name = "Chamar fila";
                    objDetail.queue = objParameters;
                    break;
                case "condition":
                    objDetail.name = "Condição";
                    objDetail.conditionGroups = objParameters.conditionGroups;
                    objDetail.thenCommand = [objParameters.thenCommand];
                    break;
                case "timeCondition":
                    objDetail.name = "Condição com horário";
                    objDetail.dows = {
                        mon: {name: "Seg", checked: objParameters.dows.some(elem => elem === 'mon')}, 
                        tue: {name: "Ter", checked: objParameters.dows.some(elem => elem === 'tue')}, 
                        wed: {name: "Qua", checked: objParameters.dows.some(elem => elem === 'wed')}, 
                        thu: {name: "Qui", checked: objParameters.dows.some(elem => elem === 'thu')}, 
                        fri: {name: "Sex", checked: objParameters.dows.some(elem => elem === 'fri')}, 
                        sat: {name: "Sab", checked: objParameters.dows.some(elem => elem === 'sat')}, 
                        sun: {name: "Dom", checked: objParameters.dows.some(elem => elem === 'sun')}
                    };
                    objDetail.startDay = objParameters.startDay;
                    objDetail.endDay = objParameters.endDay;
                    objDetail.startMonth = objParameters.startMonth;
                    objDetail.endMonth = objParameters.endMonth;
                    if(objParameters.startTime){
                        var arrStarttime = objParameters.startTime.split(":");
                        var startTime = new Date(1970, 0, 1, arrStarttime[0], arrStarttime[1], 0);
                        var timezone = startTime.getTimezoneOffset()/60;
                        var startTimeNew = new Date(1970, 0, 1, arrStarttime[0]-timezone, arrStarttime[1], 0);
                        objDetail.startTime = startTimeNew;
                    }
                    if(objParameters.endTime){
                        var arrEndtime = objParameters.endTime.split(":");
                        var endTime = new Date(1970, 0, 1, arrEndtime[0], arrEndtime[1], 0);
                        var timezone = endTime.getTimezoneOffset()/60;
                        var endTimeNew = new Date(1970, 0, 1, arrEndtime[0]-timezone, arrEndtime[1], 0);
                        objDetail.endTime = endTimeNew;
                    }
                    objDetail.thenCommand = [objParameters.thenCommand];
                    break;
                case "hangup":
                    objDetail.name = "Desligar";
                    break;
                case "goto":
                    objDetail.name = "Desvio";
                    objDetail.gotoType = objParameters.gotoType;
                    objDetail.gotoDest = objParameters.gotoDest;
                    break;
                case "dial":
                    objDetail.name = "Discar";
                    objDetail.dialType = objParameters.dialType;
                    objDetail.dialDest = objParameters.dialDest;
                    break;
                case "set":
                    objDetail.name = "Setar variável";
                    objDetail.setVar = objParameters.setVar;
                    objDetail.setVarValue = objParameters.setVarValue;
                    break;
                case "playback":
                    objDetail.name = "Tocar áudio";
                    objDetail.playbackAudio = objParameters.playbackAudio;
                    break;
                case "read":
                    objDetail.name = "Tocar áudio e capturar dígitos";
                    objDetail.readTimeout = objParameters.readTimeout;
                    objDetail.readDigits = objParameters.readDigits;
                    objDetail.readVariable = objParameters.readVariable;
                    objDetail.readAudio = objParameters.readAudio;
                    break;
                case "custom":
                    objDetail.name = "Personalizado";
                    objDetail.customCommand = objParameters.customCommand;
                    objDetail.customParameters = objParameters.customParameters;
                    break;
            }
            $scope.modelCommands.lists.definition.push(objDetail);
        });
    }
    
    
    $scope.customRules = new Array;
    $scope.ivrs = new Array;
    angular.forEach(ivrs.data, function(ivr){
        if(ivr.type === 'customRule'){
            $scope.customRules.push(ivr);
        }
        else{
            $scope.ivrs.push(ivr);
        }
    });

    $scope.deleteCustomRules = function (customRules){
        customRules.filter(function (customRule){
            if (customRule.selected){
                ivrsAPI.deleteIvrs(customRule.id).then(function (response){
                    loadCustomRules();
                }, function (error) {
                    $scope.returnStatus = error.status;
                });
            };
        });
    };

    var loadCustomRules = function () {
        ivrsAPI.getIvrs().then(function (response) {
            $scope.customRules = new Array;
            angular.forEach(response.data, function(ivr){
                if(ivr.type === 'customRule'){
                    $scope.customRules.push(ivr);
                }
            });
            $scope.checkCustomRuleSelected();
        }, function (error){
            console.log(error);
        });
    };

    $scope.checkCustomRuleSelected = function () {
        $scope.hasCustomRuleSelected = $scope.customRules.some(function (customRule) {
            return customRule.selected;
        });
    };

    $scope.orderBy = function (field) {
        $scope.orderField = field;
        $scope.direction = !$scope.direction;
    };

    $scope.addCustomRule = function (customRule) {
        
        customRule = setDetails(customRule);

        ivrsAPI.saveIvrs(customRule).then(function (response){
            delete $scope.customRule;
            $scope.customRuleForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/customRules");
        });
    };

    $scope.editCustomRule = function (customRule) {
        
        delete customRule.IvrDetails;
        customRule = setDetails(customRule);

        ivrsAPI.updateIvr(customRule.id, customRule).then(function (response){
            delete $scope.customRule;
            $scope.customRuleForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/customRules");
        });
    };

    var setDetails = function(customRule){
        customRule.type = "customRule";
        customRule.ivrDetails = new Array;
        angular.forEach($scope.modelCommands.lists.definition, function(detail){
            var newdetail = {command: detail.type, line: detail.label, parameters: ""};

            var parameters = "";

            switch (detail.type){
                case "queue":
                    parameters = detail.queue;
                    break;
                case "condition":
                    parameters = {
                        conditionGroups: detail.conditionGroups, 
                        thenCommand: detail.thenCommand[0]
                    };
                    break;
                case "timeCondition":
                    var parameterDows = new Array;
                    angular.forEach(detail.dows, function(dow, dowKey){
                        if(dow.checked){
                            parameterDows.push(dowKey);
                        }
                    });
                    parameters = {
                        dows: parameterDows, 
                        startDay: detail.startDay, 
                        endDay: detail.endDay,
                        startMonth: detail.startMonth, 
                        endMonth: detail.endMonth,
                        startTime: detail.startTime,
                        endTime: detail.endTime,
                        thenCommand: detail.thenCommand[0]
                    };
                    break;
                default:
                    delete detail.type;
                    delete detail.name;
                    delete detail.label;
                    parameters = detail;
            }

            newdetail.parameters = angular.toJson(parameters);
            customRule.ivrDetails.push(newdetail);
        });
        return customRule;
    }

    $scope.addCondition = function (group, condition) {
        group.splice((group.indexOf(condition)+1), 0, {"conditionVariable":"","conditionOperator":"","conditionValue":"","logicalOperator":""} );
    }

    $scope.removeCondition = function (group, condition) {
        group.splice( group.indexOf(condition), 1 );
    }

    $scope.addGroup = function (groups, group) {
        groups.splice( (groups.indexOf(group)+1), 0, {conditionGroup: [{conditionVariable: "", conditionOperator: "", conditionValue: "", logicalOperator: ""}], logicalOperator: ""} );
    }

    $scope.removeGroup = function (groups, group) {
        groups.splice( groups.indexOf(group), 1 );
    }

    $scope.removeCommand = function(array, item){
        array.splice(item,1);
    }
});