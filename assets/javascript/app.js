$(document).ready(function(){

	//Windo var
	var questions = [];

	//Initialize all question objects
	for(var i = 0; i < 5; i++){
		//Question object
		var triviaQuestion = {
			//Var
			question: "",
			answer: "",
			incorrectAnswers: [],
			//Set functions
			setQuestion: function(x){
				this.question = x;
			},
			setAnswer: function(x){
				this.answer = x;
			},
			setIncorrectAnswers: function(arr){
				for(var i = 0; i < arr.length; i++){
					this.incorrectAnswers.push(arr[i]);
				}
			},
			//Get function
			getQuestion: function(){
				return this.question;
			},
			getAnswer: function(){
				return	this.answer;
			},
			getIncorrectAnswer: function(i){
				return this.incorrectAnswers[i];
			},
			getIncorrectAnswers: function(){
				return this.incorrectAnswers;
			}

		};
		questions.push(triviaQuestion);
	}
	console.log(questions);
});