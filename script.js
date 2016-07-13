/*
	This script is attached to index.html
	Basically runs everything inside of a <script>
	tag for clarity. 

	Right now this is the load content
	and  check for answer script. 

*/

	////////////////////////////////////////
	// Script for the document
	///////////////////////////////////////
	$(document).ready(function(){

		//Muy importante global variables. 
		var answersArray;
		var imgSource;
		var correctPlayerAnswers = [];

		//Load stuff.
		loadContent("Module1Page1.html");

	////////////////////////////////////////
	// Checking Submission of Answer. 
	///////////////////////////////////////
			
		//Click submit button
		$("#submitButton").click(function(){

			SubmitAnswer();
		});

		//Hit enter on text field- trigger submit click
		$("#inputText").keypress(function(e)
		{
			document.getElementById("submitButton").disabled = false;

			//13 is the enter key. 
			if(e.which === 13)
			{
				e.preventDefault();
				SubmitAnswer();
			}
		});

		//Behind submit answer. 
		function SubmitAnswer()
		{
			//console.log("clicked submit");
			var inputString = $("#inputText").val();
			
			//function here to seperate answers
			if(CheckForCorrectAnswer(answersArray, inputString))
			{
				CorrectAnswerSubmitted();
			}
			else
			{
				IncorrectAnswerSubmitted();
			}
		}

	////////////////////////////////////////
	// LOAD all the content, all of it. 
	///////////////////////////////////////
		function loadContent(filename)
		{
			//test
			loadImages(filename);
			loadHeader(filename);
			loadParagraphs(filename);
			loadQuestions(filename);
			loadAnswers(filename);
			//Load in the header
//			$("submitButton").attr("disabled", true);
			document.getElementById("submitButton").disabled = true


			
		}
	
	////////////////////////////////////////
	// Actual functions for loading, from HTML. 
	///////////////////////////////////////

	function loadHeader(filename)
	{
		$("h1").load(filename + " " +"h1");

	}

	//This loads in the HTML, so the text
	//And formatting like <div> and <span>
	//Will also be loaded! 
	function loadParagraphs(filename)
	{
		//adding a callback function to save info 
		//since load is a one time thing that is dumb		
		var info = $("#part1").load(filename + " #part1", 
		function()
		{					
			saveLoadString(info, "#part1");
			//console.log($("#part1").html());
		});
	}

	function loadImages(filename)
	{

		imgSource = $("#imgLoader").load(filename + " #img1",
		//Dstination and image cannot be the same name
		//imgSource is replaced with an element named "img1"

		function()
			{
				imgSource = imgSource.text();
				ChangeImage("#img01", imgSource, "#img1");
			});
	}

	////////////////////////////////////////
	// Helper Method for Changing Image.
	///////////////////////////////////////

	//dest is where to put the img
	//img is the image to assign to it.
	//hide is the artifact loaded in to hide. 
	function ChangeImage(dest, img, hide)
	{
		//console.log("what i got: " + img);
		$(dest).attr("src", img);
		//document.getElementById("img01").src="img1.jpg";

		//hide the loaded img info
		$(hide).hide();
	}


	function loadQuestions()
	{

	}

	function loadAnswers(filename)
	{

		
		//See if there even is an answer to load
		var hasAnswer = $("#hasanswer").load(filename + " #hasanswer",
			function(){
				saveLoadString(hasAnswer,"#hasanswer");
				//Hide the text.
				$("#hasanswer").hide();

			}); 

		//Only load answers if yes
		var answersinfo = $("#answerlist").load(filename + " #answers", 
		function()
		{

			console.log("answer is : " + hasAnswer.text());

			//Set the text, then hide from user. 
			$("#answerlist").text(answersinfo.text());
			$("#answerlist").hide();

		//Parse the information & remove whitespace. 
		answersArray = answersinfo.text().split(",");

		//If there's no answers, then it's a page 
		//That doesn't require a submit button or 
		//Text box. 
		//Use the whether or not it has answers.

		if(hasAnswer.text() === "no")
		{
			console.log("there is no answer");
			$("#submitButton").hide();
			$("#inputText").hide();
		}
		else
		{
			$("#nextButton").hide();
		}

			for(i = 0; i <answersArray.length; i++)
			{
				answersArray[i] = answersArray[i].trim();
				//answersArray[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			}


		});

	}

	////////////////////////////////////////
	// Helper Method for Assigning Load info.
	///////////////////////////////////////

	//varString is what it's being stored to
	//varInfo is what is  being stored.
	//HINT:! Use. HTML instead of .TEXT for span goodies!
	//Use .TEXT for plain text!   
	function saveLoadString(varString, varInfo)
	{
		$(varInfo).html(varString.html());
	}


	////////////////////////////////////////
	// Handle Answers: Check, Correct, Wrong
	///////////////////////////////////////

	//If it's correct, save it to the array. 
	function CheckForCorrectAnswer(answersArray, userText)
	{
		//console.log("function is running");
		//Trim the user text for white space.
		trimmedUserText = userText.trim();
		//console.log("trimmed user text: ." + trimmedUserText + ".");
		for(i = 0; i < answersArray.length; i++)
		{
			if(answersArray[i] === trimmedUserText)
			{
				correctPlayerAnswers.push(trimmedUserText);
				return true;
			}
		}
		return false;
	};


	function CorrectAnswerSubmitted()
	{
		
		//console.log(correctPlayerAnswers.length);
		$("#tooltip").text("Correct! " +
		 "\n Move to next page");
		$("#nextButton").show();
		$("#inputText").val("");
		//console.log("why");
		document.getElementById("submitButton").disabled = true;
	}

	function IncorrectAnswerSubmitted()
	{
		$("#tooltip").text("Oops! That's not right."
				+ "Try checking your spelling");
	}

	//Click the next button
	$("#nextButton").click(function(){

		var nextPage = $("#nextPage").load("gentext.html #nextpagename",
			function(){
			saveLoadString(nextPage,"#nextPage");
			//console.log(nextPage.text());
			loadContent(nextPage.text());

		});


	});


});

