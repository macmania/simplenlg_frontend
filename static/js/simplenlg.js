var myApp = angular.module('simpleNLGApp', []);



myApp.controller('subjectVerbObjectController',['$scope', '$http', function($scope, $http){
	$scope.submit = function(sentence){
		if(sentence == null){
			return;
		}
		if(sentence.verbTense == null){
			sentence.verbTense = "present";
		}

		if(sentence.negated == null) {
			sentence.negated = "False";
		}
		if(sentence.subject == "i"){
			sentence.subject = "I";
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
			headers: { 
				'negateSentence': sentence.negated
			}
		})
		.success(function(data){
			$scope.resultSentence = data
			console.log(data)
		});
	}
}]);

myApp.controller('questionSentenceController', ['$scope', '$http', function($scope, $http){
	$scope.questions = [
		{
			'type': 'What <subject>', 
			'question': 'What',
			'description': "This type of interrogative is a question " + 
							"pertaining to the subject of a phrase", 
			"example": "What destroyed the house?",
			'value': "what_sub"
		}, 
		
		{
			'type': 'What <object>', 
			'question': 'What',
			'description': "This type of interrogative is a question pertaining " 
						 + "to the object of a phrase", 
			"example": "What did John buy?", 
			"value": "what_obj"
		}, 
		{
			'type': 'How', 
			'question': 'How',
			'description': "The type of interrogative relating to the manner " + 
							"in which an event happened", 
			"example": "How did John hug Mary?",  
			"value": "how"
		}, 
		{
			'type': 'How <predicate>', 
			'question': 'How',
			'description': "A how question related to a predicative sentence",  
			"example": "How is John?", 
			"value": "how_pred"
		}, 
		{
			'type': 'Where',
			'question': 'Where',
			'description': "This type of interrogative concerns the object of a verb that "
         					+ "is to do with location", 
         	"example": "Where did John go?", 
         	"value": "where"
        }, 
		{
			'type': 'Who <indirect object>', 
			'question': 'Who',
			'description': "This type of interrogative is a question" +
							"pertaining to the indirect object of a phrase when the indirect object " + 
									"is a person", 
			"example": "Who did John give a flower?", 
			"value": "who_indirect"
		}, 
		{
			'type': 'Who <object>',
			'question': 'Who', 
			'description':"This type of interrogative is a question pertaining to " + 
							"the object of a phrase when the object is a person.", 
			"example": "Who did John hug?", 
			"value": "who_obj"
		},
		{
			'type': 'Who <subject>', 
			'question': 'Who',
			'description': " This type of interrogative is a question" + 
							" pertaining to the subject of a phrase when the subject is a person.",
			"example": "Who hugged Mary?", 
			"value": "who_sub"
		}, 
		{
			'type': 'Why', 
			'question': 'Why',
			'description': "The type of interrogative relating to the reason for an event happening.",
			"example": "Why did John hug Mary?", 
			"value": "why"
		}, 
		{
			'type': 'Yes-No', 
			'question': 'Is/Does/Do',
			'description': "This represents a simple yes/no questions" ,
			"example": "Is John a professor? Does John eat?",
			"value": "yes_no"
		}, 
		{
			'type': 'How many', 
			'question': 'How many',
			'description': "This represents a 'how many' questions",
			"example": "How many dogs chased John?",
			"value": "how_many"
		}
	]

	$scope.submit = function(sentence, questionType){
		$http({
			method: 'POST', 
			url: "https://simplenlg-features.herokuapp.com/generate-question",
			data: {
				"typeQuestion": questionType,
				"subject": sentence.subject, 
				"verb": sentence.verb, 
				"object": sentence.objectStr, 
				typeSentence: "QuestionSentence"
			}, 
		})
		.success(function(data){
			$scope.resultQuestion = data
		});
	}
}]);

