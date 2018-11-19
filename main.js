(function(){
	//element and context
	var stage = document.getElementById('stage'); //element
	var ctx; //context
	

	//keydown 
	document.onkeydown = keydown;
	//stage.setAttribute('tabindex', 0); // focusしている時のみ、keyDown,up を有効に
	//stage.addEventListener('keydown', keydown, {passive:false});
		
	//onkeyup
	document.onkeyup = keyup;
	
		
	//canvas size
	var width = 1000;
	var height = 800; 

	//return if element not exist
	if(typeof stage.getContext === 'undefined'){
		return;
	}

	//create context instance
	ctx = stage.getContext('2d');

	//setting width and height
	stage.width = width;
	stage.height = height;
	
	//adopt high resolution
	stage.style.width = width + 'px';
	stage.style.height = height + 'px';

	class Point{
		constructor(x, y){
			this.x = x;
			this.y = y;
		}
	}

	keysize = 60;

	class OneKey{
		constructor(name, x, y, keycode=stringTokeycode(name)){
			this.name = name;
			this.x = x;
			this.y = y;
			this.inputFlag = 0;
			this.keycode = keycode;
		}

		drawFrame(){
			ctx.beginPath();
			ctx.rect(this.x, this.y, keysize, keysize);
			ctx.stroke();
		}

		drawBackground(){
			ctx.beginPath();
			if(this.inputFlag) ctx.fillStyle = "rgba(256, 100, 100, 0.5)";
			else ctx.fillStyle = "white";
			ctx.fillRect(this.x, this.y, keysize, keysize);
			ctx.stroke();	
		}

		drawKey(){
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.font = keysize/2+"px sunserif";
  			ctx.fillText(this.name, this.x+keysize*0.1, this.y+keysize*0.9);
		}

		draw(){
			this.drawBackground();
			this.drawFrame();
			this.drawKey();
		}
	}

	var akey = new OneKey("a", 10, 10);
	akey.draw();

	var keys1 = "1234567890-^\\";
	var keys2 = "QWERTYUIOP@[";
	var keys3 = "ASDFGHJKL;:]";
	var keys4 = "ZXCVBNM,./_";
	var keys = [];
	for(var key in keys1){
		keys.push(new OneKey(keys1[key], key*keysize, keysize*0, stringTokeycode(keys1[key])))	;
	}
	for(var key in keys2){
		keys.push(new OneKey(keys2[key], key*keysize, keysize*1, stringTokeycode(keys2[key])))	;
	}
	for(var key in keys3){
		keys.push(new OneKey(keys3[key], key*keysize, keysize*2, stringTokeycode(keys3[key])))	;
	}
	for(var key in keys4){
		keys.push(new OneKey(keys4[key], key*keysize, keysize*3, stringTokeycode(keys4[key])))	;
	}

	function stringTokeycode(string){
		for(var i=0; i<250; i++){
			if(String.fromCharCode(i) == string) return i;
		}
	}
		
	class Keyboard{
		constructor(keys, x, y){
			this.keys = keys;
			this.x = x;
			this.y = y;
			for(var k of keys){
				k.x += this.x;
				k.y += this.y;
			}
		}

		draw(){
			//upper
			for(var k of this.keys){
				k.draw();
			}
		}
	}	

	var keyboard = new Keyboard(keys, 100, 100)

	inputhistroy = [];

	function keydown(e){
		console.log(String.fromCharCode(e.keyCode));
		for(var k of keyboard.keys){
			if(e.key == k.name){
				k.inputFlag = 1;
			}
		}
		inputhistroy.push(e.key);
		if(inputhistroy.length >= 30) inputhistroy.shift();
	}
		
	function keyup(e){
		for(var k of keyboard.keys){
			if(e.key == k.name){
				k.inputFlag = 0;
			}
		}
	}
		
	function draw(){
		ctx.clearRect(0, 0, width, height);
		keyboard.draw();

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = keysize/2+"px sunserif";
		ctx.fillText(inputhistroy, keyboard.x, 700);
	}	

	setInterval(draw, 10);

})();