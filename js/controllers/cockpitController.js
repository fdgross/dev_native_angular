angular.module("nativeIP").controller("cockpitController", function ($scope, peers, serverInfoAPI, $interval, $filter) {

    $scope.cpuChart = {};
    $scope.memChart = {};
    $scope.diskChart = {};

    var peers = peers.data;
    var peersRegistered = $filter('filter')(peers, function(peer){
      return (peer.sipRegStatus === 'Registered' || peer.iaxRegStatus === 'Registered');
    });

    $scope.countPeersRegistered = peersRegistered.length;
    $scope.countPeers = peers.length;
    ;

    $scope.peersLastModification = Math.max.apply(null,peers.map(function(o) { return new Date(o.updatedAt) }));

    $scope.$on('$viewContentLoaded', function() {
      updateServerInfo(serverInfoAPI);
    });

    $interval(function () {
      updateServerInfo(serverInfoAPI);
    }, 5000);

    var updateServerInfo = function (serverInfoAPI){
      serverInfoAPI.getServerInfo().then((serverInfoTmp) => {
        $scope.setServerInfo(serverInfoTmp);
      });
    }

    $scope.setServerInfo = function (serverInfoTmp) {
      var serverInfo = serverInfoTmp.data;
      var currentLoad = Math.round(serverInfo.currentLoad.currentload);
      var memUsed = Math.round((serverInfo.mem.used/serverInfo.mem.total)*100);
      var diskTotalSize = 0;
      var diskTotalUse = 0;
      var disks = new Array;

      serverInfo.disk.forEach(disk => {
        if(disk.use){
          diskTotalSize += parseInt(disk.size);
          diskTotalUse += disk.used;

          var diskClass = 'success';
          if(disk.use >= 90){
            diskClass = 'danger';
          }
          if((disk.use >= 75) && (disk.use < 90)){
            diskClass = 'warning';
          }
          
          disks.push({mount: disk.mount, use: Math.round(disk.use), diskClass});
        }
      });
      $scope.disks = disks;
      var diskUsed = Math.round((diskTotalUse/diskTotalSize)*100);

      var thickness = 2;
      var mode = "gauge";
      var total = 100;

      var charDefaultOptions = {thickness, mode, total};

      $scope.cpuChart.data = [
          {label: "CPU", value: currentLoad, suffix: "%", color: "steelblue"},
        ];
      $scope.cpuChart.options = charDefaultOptions;
  
      $scope.memChart.data = [
          {label: "RAM", value: memUsed, suffix: "%", color: "steelblue"},
      ];
      $scope.memChart.options = charDefaultOptions;

      $scope.diskChart.data = [
          {label: "HD", value: diskUsed, suffix: "%", color: "steelblue"},
        ];
      $scope.diskChart.options = charDefaultOptions;

      $scope.uptime = parseInt(serverInfo.time.uptime);
      $scope.curtime = serverInfo.time.current;

      $scope.serviceList = serverInfo.services;
    };
});