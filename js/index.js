/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var continueplaying = true;
var currentplate
var hidetime;
var currentdiff = "easy";
var score = 0;
var lives = 3;

function randomizeletter() {
	return letters.charAt(Math.floor(Math.random() * letters.length));
}

function randomizenumber() {
	return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function hideplate() {
	$(".platebox").hide();
	$("#choice1").show();
	$("#choice2").show();
	$("#choice3").show();
	$("#choice4").show();
}

function showplate() {
	$(".platebox").show();
	
	/*var c = document.getElementById("responsecanvas");
	var ctx = c.getContext("2d");
	var img = new Image();
	img.onload = function () {
		ctx.drawImage(img, 200, 100);
	};
	img.src = "img/plate.jpg";*/
	
	$(".choice").removeClass("clr-btn-green");
	$(".choice").removeClass("clr-btn-red");
	$(".choice").removeClass("ui-state-hover");
	$(".choice").hide();
}

function updatescore() {
	$("#score").text("Score: " + score);
	$("#lives").text("Lives: " + lives);
	gameover(lives);
}

function gameover(lives) {
	if (lives == 0){
		$.mobile.pageContainer.pagecontainer("change", "#gameover", {transition: "none"});
		var highscore = localStorage.getItem("highscore");
		if(highscore !== null){
		   if (score > highscore) {
			  localStorage.setItem("highscore", score );
			  }
		}else{
			  localStorage.setItem("highscore", score );
		}
		$("#currentscore").text("Your score: " + score);
		$("#highscore").text("Highscore: " + localStorage.getItem("highscore"));
	}
}

var disabled = false;

function newround(){
	function starttimer(score) {
		if (score <=3) {
			hidetime = 2500;
		} else if (score > 3 && score <= 6) {
			hidetime = 2000;
		} else if (score >6 && score <=10){
			hidetime = 1500;
		} else if (score > 10 && score <= 13) {
			hidetime = 1250;
		} else {
			hidetime = 1000;
		}
		
		if (score <= 3) {
			currentdiff = "easy";
		} else if (score >3 && score <=5) {
			currentdiff = "medium";
		} else if (score > 5 && score< 8) {
			currentdiff = "hard";
		} else {
			currentdiff = "hardest";
		}
	}
	
	disabled = false;
	showplate();
	starttimer(score);
	
	function genanswer(difficulty) {
		console.log(difficulty);
		var answer = "";
		var temp = "";
		var index;
		switch(difficulty) {
			case "easy":
				var index1 = Math.floor(Math.random() * 4);
				answer = currentplate.substr(0,index1) + randomizeletter() + currentplate.substr(index1 + 1);
				temp = answer;
				var index2;
				do {
					index2 = Math.floor(Math.random() * 4);
				} while (index2 == index1);
				answer = temp.substr(0,index2) + randomizeletter() + temp.substr(index2 + 1);
				temp = answer;
				var index3 = Math.floor(Math.random() * 3);
				answer = temp.substr(0,4+index3) + randomizenumber() + temp.substr(index3 + 5);
				break;
			case "medium":
				var index1 = Math.floor(Math.random() * 3 + 1);
				console.log(index1);
				answer = currentplate.substr(0,index1) + randomizeletter() + currentplate.substr(index1 + 1);
				temp = answer;
				var index2 = Math.floor(Math.random() * 3);
				answer = temp.substr(0,4+index2) + randomizenumber() + temp.substr(index2 + 5);
				break;
			case "hard":
				index = Math.floor(Math.random() * 3 + 1);
				answer = currentplate.substr(0,index) + randomizeletter() + currentplate.substr(index + 1);
				break;
			case "hardest":
				var choosediff = Math.floor(Math.random() * 3);
				if (choosediff == 0) {
					index = Math.floor(Math.random() * 3);
					answer = currentplate.substr(0,4+index) + randomizeletter() + currentplate.substr(index + 5);
					break;
				} else if (choosediff == 1) {
					index = Math.floor(Math.random() * 3 + 1);
					answer = currentplate.substr(0,index) + randomizeletter() + currentplate.substr(index + 1);
					break;
				} else {
					var index1 = Math.floor(Math.random() * 3 + 1);
					answer = currentplate.substr(0,index1) + randomizeletter() + currentplate.substr(index1 + 1);
					temp = answer;
					var index2 = Math.floor(Math.random() * 3);
					answer = temp.substr(0,4+index2) + randomizeletter() + temp.substr(index2 + 5);
					break;
				}
		}
		return answer;
	}
	
	function correctanswer() {
		var current = Math.floor(Math.random() * 4 + 1);
		switch (current) {
			case 1:
				$("#choice1").text(currentplate);
				break;
			case 2:
				$("#choice2").text(currentplate);
				break;
			case 3:
				$("#choice3").text(currentplate);
				break;
			case 4:
				$("#choice4").text(currentplate);
				break;
		}
	}
	
	currentplate = randomizeletter() + randomizeletter() + randomizeletter() + randomizeletter() + randomizenumber() + randomizenumber() + randomizenumber();
	
	$(".plate").text(currentplate);
	
	window.setTimeout(hideplate, hidetime);
	
	$("#choice1").text(genanswer(currentdiff));
	$("#choice2").text(genanswer(currentdiff));
	$("#choice3").text(genanswer(currentdiff));
	$("#choice4").text(genanswer(currentdiff));
	
	correctanswer();
}

newround();

function animateanswer(result, id) {
	if (result == "right") {
		$("#" + id).addClass("clr-btn-green");
	} else {
		$("#" + id).addClass("clr-btn-red");
	}
}

$( ".choice" ).click(function() {
	if (disabled == false) {
		var x = $(this).attr('id');
		if ($(this).text() == currentplate) {
			animateanswer("right",x);
			score ++;
		} else {
			animateanswer("wrong",x);
			lives --;
		}
		updatescore();
		window.setTimeout(newround, 700);
		disabled = true;
	}
});

$(document).bind("mobileinit", function()
	{
		if (navigator.userAgent.indexOf("Android") != -1)
		{
			$.mobile.defaultPageTransition = 'none';
			$.mobile.defaultDialogTransition = 'none';
		}
	});

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    window.location = "index.html";
}