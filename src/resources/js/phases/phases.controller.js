(function (Controllers, undefined)
{
	MCU.Modules.MCU.controller("PhasesCtrl", ['$scope', 'phasesService', 
		function ($scope, phasesService)
	{
		var promise = phasesService.getPhases();
		promise.then(function (data)
		{
			$scope.phases = data.data.MCU.Phases;
			console.log($scope.phases);
		})
	}]);
}(MCU.Controllers = MCU.Controllers || {} ));