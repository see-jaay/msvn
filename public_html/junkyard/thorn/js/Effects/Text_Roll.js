



// var words = [
// 	['machsevn', 0],
// 	['coming.soon', 4],
// 	['mvchaevn', .01],

// ];

// var pool = '+-/\\~:_abcdefghijklmnopqrstuvwxyz';

// var targetWord, currentWord, lastWord;

// var interval = 7;
// var time = 0, delayTime = 0;;
// var delayCounter = 0, delayCountLimit = 0;
// var init = false;
// var rolling = false;

// function TRInit(){
// 	currentWord = "machsevn";
// 	init = true;

// 	for(var i = 0; i < words.length; i++){
// 		pool += words[i][0];
// 	}

// 	$('.trh').each(function(){
// 		$(this).hover(TRH($(this)));
// 	});
// }

// function TRSet(target) {
// 	targetWord = target;
// 	interval = 3;
// 	rolling = true;
// 	time = 0;
// }

// function TRH(target){
// 	time = 0;
// 	delayTime = 0;
// 	targetWord = $(target).data("trh");
// 	interval = 3;
// 	rolling = true;
// 	delayCountLimit = interval;
// }

// function TRC(target){
// 	time = 0;
// 	delayTime = 0;
// 	targetWord = $(target).data("trc");
// 	interval = 3;
// 	rolling = true;
// 	delayCountLimit = interval;
// }

// function TRUpdate(dt){

// 	if(!rolling)
// 	{

// 		lastWord = currentWord;	
// 		time += dt*10;

// 		if(time >= interval)
// 		{
// 			time = 0;
// 			var word = words[randomInt(0, words.length - 1)];
// 			targetWord = word[0];
// 			interval = (word[1] == 0) ? randomInt(7, 14) : randomInt(word[1],word[1]) ;
// 			rolling = true;
// 			delayCountLimit = interval;
// 		}
// 	}
// 	else {
// 		delayTime += dt*10;

// 		if(delayTime > delayCountLimit)
// 		{
// 			delayTime = 0;
// 			targetWord = lastWord;
// 			interval = 1;
// 			rolling = true;
// 		}
// 	}
// 	// $('.roll-text').each(function(){
// 	// 	var words = $(this).data('words');
// 	// 	words = words.split(',');

// 	// 	var word

// 	// 	for(var i = 0; i < )
// 	// });

// 		// console.log("target");


// 	if(rolling)
// 	{
// 		var temp = '';
// 		// console.log(currentWord, targetWord);
// 		for(var i = 0; i < targetWord.length; i++)
// 		{
// 			if(targetWord[i] == currentWord[i])
// 				temp += currentWord[i];
// 			else
// 				temp += pool[randomInt(0, pool.length-1)];
// 		}

// 		if(currentWord == targetWord)
// 			rolling = false;
// 		else
// 			rolling = true;

// 		currentWord = temp;
// 	}
// 	else
// 	{
// 		// delayCounter += dt*10;
// 		// if(delayCounter > delayCountLimit)
// 		// {
// 		// 	var temp = '';
// 		// 	// console.log(currentWord, targetWord);
// 		// 	var wordLength = 0;
// 		// 	for(var i = 0; i <= wordLength; i++)
// 		// 	{
// 		// 		if(randomInt(0,1)){
// 		// 			temp+= pool[randomInt(0, pool.length-1)];
// 		// 		}else{
// 		// 			temp+=currentWord[i];
// 		// 		}

// 		// 		if(i == wordLength)
// 		// 			wordLength += 1;
// 		// 		else if(i > targetWord.length)
// 		// 			wordLength = 0;
// 		// 	}

// 		// 	rolling = true;
// 		// 	delayCounter = 0;
// 		// }

// 		// currentWord = temp;
// 	}


// 	$('.roll-text').text(currentWord);

// 	// console.log($('.roll-text').text());
// 	// $('.roll-text').text("dog");

// }