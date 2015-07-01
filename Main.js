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

var Sprite = function(filename, is_pattern)	{

	this.image = null;
	this.pattern = null;
	this.TO_RADIANS = Math.PI / 180;

	if(filename !== undefined && filename !== "" && filename !== null) {
		
		this.image = new Image();
		this.image.src = filename;

		if(is_pattern) {
		
			this.pattern = Context.context.createPattern(this.image, 'repeat');
		
		}
		
	} else {
		console.log("unable to load image");
	}

	this.draw = function(x, y, w, h) {
		
		if(this.pattern !== null) {
		
			Context.context.fillStyle = this.pattern;
			Context.context.fillRect(x, y, w, h);
		
		} else {
			
			if(w === undefined || h === undefined) {
			
				Context.context.drawImage(this.image, x, y,
										this.image.width,
										this.image.height);
			
			} else {
				
				Context.context.drawImage(this.image, x, y, w, h);
				
			}
		}
	};
	
	this.rotate = function(x, y, theta) {
		
		Context.context.save();
		
		Context.context.translate(x, y);
		Context.context.rotate(theta * this.TO_RADIANS);
		
		Context.context.drawImage(this.image,
				-(this.image.width/2),
				-(this.image.height/2));
		
		Context.context.restore();
		
	};
};

$(document).ready(function() {
	
	Context.create("canvas");

	Context.context.rect(0, 0, Context.width, Context.height);
	Context.context.fillStyle = 'black';
	Context.context.fill();

});