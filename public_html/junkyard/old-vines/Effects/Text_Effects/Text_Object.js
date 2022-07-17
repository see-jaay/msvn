class CharObject {
	constructor(character)
	{
		this.character = character;
		this.width = 15;
		this.height = 15;
		this.pos = new Vector3(0,0,0);
		this.element;
	}

	Init(element)
	{
		this.element = $(element);
		this.element.css({
			'width':this.width + 'px',
			'height': this.height + 'px',
		});
	}

	Update(dt)
	{
		// console.log("Update char");

		this.element.css({
			'left': this.pos.x + 'px',
			'top': this.pos.y + 'px'
		});
		// console.log(this.element);
	}
}

class TextObject {
	constructor(element, clss)
	{
		this.altText = ["7-17-17", "DAYSEVN", "MACHSEVN"];
		this.effects = [];
		this.chars = [];
		this.element = $(element);
		this.class = clss;
	}

	Init()
	{
		this.text = this.element.text();
		this.element.text('');
		for(var i = 0; i < this.text.length; i++)
		{
			var cobj = new CharObject(this.text[i]);
			cobj.pos.x = i * cobj.width;

			this.element.append('<div id="'+this.class+'_'+ i + '" class="' + this.class + '-char">' + this.text[i] + '</div>');
			// cobj.element = $(this.class+'_'+ this.text[i]);s
			cobj.Init('#' + this.class+'_'+ i);
			this.chars.push(cobj);
		}

		this.element.css({
			'width': this.chars[0].width * this.chars.length-5 + 'px',
			'height': this.chars[0].height + 'px'
		});
	}

	Update(dt){
		// this.text = this.altText[randomInt(0, this.altText.length-1)];

		// this.chars = [];
		
		// for(var i = 0; i < this.text.length; i++)
		// {
		// 	this.chars.push(this.text[i]);
		// }

		for(var i = 0; i < this.chars.length; i++){
			this.chars[i].Update(dt);
		}
	}
}