$(document).ready(function(){
	//GameControl
	var gameControl = {
		//GameControl object var:
		//Array with all the triviaQuestion objects
		triviaQuestions: [],
		//Timer var
		timer: 30,
		//Correct answer var
		correctAnswers: 0,
		//Incorrect answer var
		incorrectAnswer: 0,
		//Unanswered var
		unanswered: 0,
		//Count var to track current question
		count: 0,
		intervalId : null,
		//Start game resets all values back to original
		startGame: function(){
			this.triviaQuestions = [];
			this.timer = 30;
			this.correctAnswers = 0;
			this.incorrectAnswer = 0;
			this.unanswered = 0;
			this.count = 0;
			this.initializeArray();
			this.declareArry();
			this.displayQuestions();
		},
		initializeArray: function(){
			for(var i = 0; i < 10; i++){
				//Question object
				var questionObject = {
					//Var for question
					question: "",
					answer: "",
					choises: [],
					//Constructor
					declareQuestion: function(q,a,c){
						this.setQuestion(q);
						this.setAnswer(a);
						this.setChoises(c);
					},
					//Set functions
					setQuestion: function(x){
						this.question = x;
					},
					setAnswer: function(x){
						this.answer = x;
					},
					setChoises: function(x){
						for(var i = 0; i < x.length; i++){
							this.choises.push(x[i]);
						}
					},
					//Get function
					getQuestion: function(){
						return this.question;
					},
					getAnswer: function(){
						return	this.answer;
					},
					getChoises: function(i){
						return this.choises[i];
					},
				};
				this.triviaQuestions.push(questionObject);
			}
		},
		declareArry: function(){
			//Declaring Trivial Questions
			var tempArray = ["Stephen King","J. K. Rowling","William Shakespeare","George R. R. Martin"];
			this.triviaQuestions[0].declareQuestion("Who is the author of the books?", "George R. R. Martin", tempArray);
			tempArray = ["Brienne","Melisandre","Missandei","Shae"];
			this.triviaQuestions[1].declareQuestion("Who is Daenerys Targaryen servant girl?", "Missandei", tempArray);
			tempArray = ["Needle","Lightbringer","Ice","Heartsbane"];
			this.triviaQuestions[2].declareQuestion("What is Arya Stark’s sword’s name?", "Needle", tempArray);
			tempArray = ["Viserion, Drogon, and Rhaegal","Drogo, Draco, Dracaris","Rhaegar, Viserys, Drogo","Rhaegar, Rhaegal, Rhaegon"];
			this.triviaQuestions[3].declareQuestion("What are the names of Daenerys’ dragons?", "Viserion, Drogon, and Rhaegal", tempArray);
			tempArray = ["Rickon","Arya","Sansa","Bran"];
			this.triviaQuestions[4].declareQuestion("In the first episode of season one, who was the one to discover Cersei’s secret?", "Bran", tempArray);
			tempArray = ["The Drowned God","The Many-faced God"," Old Gods of the Forest","R&#39hllor"];
			this.triviaQuestions[5].declareQuestion("Which God is also known as the God of Death?", "The Many-faced God", tempArray);
			tempArray = ["Needle","Heartsbane","Lightbringer","Ice"];
			this.triviaQuestions[6].declareQuestion("What was the name of Ned Stark's sword?", "Ice", tempArray);
			tempArray = ["Ghost","Nymeria","Lady","Summer"];
			this.triviaQuestions[7].declareQuestion("What was the name of Arya's direwolf?", "Nymeria", tempArray);
			tempArray = ["Guardian of Braavos","Shield of Braavos","Titan of Braavos","Protector of Braavos"];
			this.triviaQuestions[8].declareQuestion("What is the name of the massive statue that guards Braavos?", "Titan of Braavos", tempArray);
			tempArray = ["Rickon","Arya","Cersei Lannister","Bran"];
			this.triviaQuestions[9].declareQuestion("Who said, “When you play the game of thrones, you win or you die”?", "Cersei Lannister", tempArray);
		},
		//Start the timer
		startTimer: function(){
			gameControl.timer = 30;
			gameControl.intervalId = setInterval(this.timerRunning, 1000);
		},
		//Calculate Time
		timerRunning: function(){
			// console.log("length: " + gameControl.triviaQuestions.length);
			// console.log("count: " + gameControl.count);
			// console.log(gameControl.timer);
			$("#timer").html(gameControl.timer);
			gameControl.timer--;
			if(gameControl.triviaQuestions.length === gameControl.count){
				gameControl.stopTimer();
				gameControl.displayResults();
			}
			if(gameControl.timer < 0){
				console.log("stopTime");
				gameControl.stopTimer();
				gameControl.unanswered++;
				gameControl.count++;
				gameControl.displayQuestions();
				gameControl.timer = 30;
			}
		},
		//Stops the timer
		stopTimer: function(){
			//clear the time
			clearInterval(gameControl.intervalId);
		},
		//Rotates to a new question
		displayQuestions: function(){
			if(gameControl.count === gameControl.triviaQuestions.length){
			gameControl.displayResults()
			return;
			}
			//Clear html
			$("#question").html("");
			$("#results").html("");
			$("#answers").html("");
			gameControl.startTimer();

			var q = $("<h1>");
			q.html(gameControl.getQuestion());
			$("#question").append(q);

			for(var i = 0; i < 4; i++){
				var l = $("<label>");
				l.html("<input type='radio' class='input' name='choises' value='" +
						 gameControl.getChoises(i) + "'/> " + (gameControl.getChoises(i)));
				$("#answers").append(l);
			}
			var b = $("<button>");
			b.attr("id", "summit");
			b.html("Summit");
			$("#results").append(b);	
		},
		//Calculates the result
		calculateAnswer: function(){
			$(".input").each(function(){
				if($(this).is(":checked")){
					if(gameControl.getAnswer() === $(this).attr("value")){
						gameControl.displayImg("Correct!");
						return;
					}else{
						gameControl.displayImg("Wrong!")
						gameControl.incorrectAnswer++;
						gameControl.count++;
					}
				}
			});
		},
		displayImg: function(x){
			//console.log(x);
			gameControl.stopTimer();
			$("#question").html("");
			$("#answers").html("");
			$("#results").html("");
			// var captionDiv = $("<caption>");
			// captionDiv.html(x);
			// var imgDiv = $("<img id='qImg' src='assets/images/q" +gameControl.count + ".jpg'/>" +
			// 			captionDiv);
			// imgDiv.addClass("img-fluid");
			var imgDiv =("<img id'qImg' src='assets/images/q" + gameControl.count +
						  ".jpg'/><label class='qCaption'><b>"+ x +"<b></label>")
			$("#results").append(imgDiv);
			setTimeout(function () {
				gameControl.correctAnswers++;
				gameControl.count++;
				gameControl.displayQuestions();
			}, 5000);
		},	
		displayResults: function(){
			$("#question").html("");
			$("#answers").html("");
			$("#results").html("");

			var r = "<h1>Right answers: " + gameControl.correctAnswers + "</h1><br>";
			$("#results").append(r);
			r = "<h1>Wrong answers: "+ gameControl.incorrectAnswer + "</h1><br>";
			$("#results").append(r);
			r = "<h1>Unanswered questions:" + gameControl.unanswered + "</h1><br>";
			$("#results").append(r);
			r = $("<button>").attr("id","reset").text("PLAY AGAIN!")
			$("#results").append(r);
		},
		getQuestion: function(){
			
			return gameControl.triviaQuestions[gameControl.count].getQuestion();
		},
		getAnswer: function(){
			
			return gameControl.triviaQuestions[gameControl.count].getAnswer();
		},
		getChoises: function(i){
			
			return gameControl.triviaQuestions[gameControl.count].getChoises(i);
		}
	}

	gameControl.startGame();
	console.log(gameControl.triviaQuestions);
	console.log(gameControl.count);
	$(document).on("click","#summit", function(){
		gameControl.calculateAnswer();
		if($('.input').is(':checked')){
			if(gameControl.count === gameControl.triviaQuestions.length){
				gameControl.displayResults();
			}
			else{
				gameControl.stopTimer();
				gameControl.displayQuestions();
				gameControl.startTimer();
			}
			//console.log("test");
		}
	});
	$(document).on("click", "#reset", function(){
		
		gameControl.startGame();
	});
});