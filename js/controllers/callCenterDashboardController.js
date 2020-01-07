angular.module("nativeIP").controller("callCenterDashboardController", function ($scope, peers, $location) {
    $scope.agents = [
            {"name": "Fábio Danieleski Gross", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1000", "status": "agent-loggedoff", "lastLogin": "05/12/2019 10:00:00", "lastLogoff": "05/12/2019 12:00:00"},            
            {"name": "Fábio", "lastCall": "", "queues": ["comercial", "suporte", "financeiro"], "exten": "1002", "status": "agent-logged-paused" , "pausedTime": "00:10:00", "pauseType": "Reunião"},
            {"name": "Maurício Martinelo Gomes", "lastCall": "", "queues": ["comercial", "suporte", "financeiro"], "exten": "1002", "status": "agent-logged-paused" , "pausedTime": "00:10:00", "pauseType": "Reunião"},
            {"name": "Lucas Carnino", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1004", "status": "agent-logged-free-noactivity", "lastCall": "00:10:00"},
            {"name": "Maurício", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1000", "status": "agent-loggedoff", "lastLogin": "05/12/2019 10:00:00", "lastLogoff": "05/12/2019 12:00:00"},
            {"name": "Maico Nienow", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1004", "status": "agent-logged-free-noactivity", "lastCall": "00:10:00"},
            {"name": "Lucas", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1003", "status": "agent-logged-busy", "onCall": "00:00:45", "number": "54996114393"},
            {"name": "Maurício Gomes", "lastCall": "", "queues": ["comercial"], "exten": "1001", "status": "agent-logged-paused-exceeded", "pausedTime": "00:30:00", "pauseType": "Almoço"},
            {"name": "Maico", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1003", "status": "agent-logged-busy", "onCall": "00:00:45", "number": "54996114393"},
            {"name": "Lucas Comerlato Carnino", "lastCall": "", "queues": [{"name": "suporte", "status": "logged", "penalty": 1], "exten": "1005", "status": "agent-logged-free", "lastCall": "00:01:00"},
            {"name": "Fábio Gross", "lastCall": "", "queues": ["comercial"], "exten": "1001", "status": "agent-logged-paused-exceeded", "pausedTime": "00:30:00", "pauseType": "Almoço"},
        ]
    
});