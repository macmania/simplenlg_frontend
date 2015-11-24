var myApp = angular.module('simpleNLGApp', []);



myApp.controller('subjectVerbObjectController',['$scope', '$http', function($scope, $http){
	$scope.submit = function(sentence){
		if(sentence == null){
			return;
		}
		if(sentence.verbTense == null){
			sentence.verbTense = "present";
		}

		$http({
			method: 'POST', 
			url: "https://simplenlg-features.herokuapp.com/generate-sentence", 
			data: {
				"subject": sentence.subject, 
				"verb": sentence.verb, 
				"object": sentence.objectStr, 
				"typeSentence": "SubjectVerbObject", 
				"verbTense": sentence.verbTense,
			}, 
		})
		.success(function(data){
			$scope.resultSentence = data
			console.log(data)
		});
	}
}]);

myApp.controller('')

