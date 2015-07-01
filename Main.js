var Context = {

		canvas : null,
		context : null,
		width : null,
		height : null,

		create : function(canvas_tag_id) {
	
			this.canvas = document.getElementById(canvas_tag_id);
			this.context = this.canvas.getContext('2d');

			this.width = $(window).width();
			this.height = $(window).height();

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			console.log(this.width + " " + this.height);
			return this.context;
		
		}
};

var Sprite = function(filename)	{

	this.image = new Image();
	this.TO_RADIANS = Math.PI / 180;

	if(filename !== undefined && filename !== "" && filename !== null) {
		this.image.src = filename;
	} else {
		console.log("unable to load image");
	}

	this.draw = function(x, y) {
	  this.image.onload = function() {
	    Context.context.drawImage(this.image, x, y);
	  };
	};//END DRAW
	
	this.rotate = function(x, y, theta) {
		
		Context.context.save();
		
		Context.context.translate(x, y);
		Context.context.rotate(theta * this.TO_RADIANS);
		
		Context.context.drawImage(this.image,
				-(this.image.width/2),
				-(this.image.height/2));
		
		Context.context.restore();
		
	};//END ROTATE
}; //END SPRITE

var Textures = {
  ship: new Sprite("ship.png")
};

var Player = {
  
};

var Game = {
  fps: 60
};

Game.draw = function() {
  //Context.context.rect(0, 0, Context.width, Context.height);
  //Context.context.fillStyle = 'black';
  //Context.context.fill();
  
  console.log("drawing ship");
  Textures.ship.draw(320, 260);
};
  
Game.update = function() {
  console.log("update");
};

Game.run = (function() {
  var loops = 0, skipTicks = 1000 / Game.fps,
    maxFrameSkip = 10,
    nextGameTick = (new Date()).getTime();
    
    return (function() {
      loops = 0;
      
      while ((new Date()).getTime() > nextGameTick && loops < maxFrameSkip) {
        Game.update();
        nextGameTick += skipTicks;
        loops++;
      }
      
      Game.draw();
  });
})();
  
$(document).ready(function() {
	
	Context.create("canvas");
  setInterval(Game.run(), 1000 / 60);
  
}); //END DOCUMENT.READY