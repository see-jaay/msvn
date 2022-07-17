//Text Grid Effect


var chars = "machsevn/>0x" 

class Cell {
	constructor ()
	{
		this.character = '';
		this.width = 0;
		this.height = 0;
		this.id;
		this.count = 0;
	}

	Shuffle (char)
	{
		var text = $('#center_text').text();
		do
		{
			this.character = chars[randomInt(0, chars.length-1)];


			text = text.replace(text[0], this.character);

			console.log(text);
		} while(this.character != char);
	}

	Update (dt)
	{

		// do
		// {
		// 	this.count += deltaTime;
		// 	console.log(this.count);
		// } while (this.count < 2);

		// this.count = 0;
	}
}

class Grid {
	constructor (width, height)
	{
		//xy value to int

		// (y * gridWidth) - (gridWidth - x)
		this.height = height;
		this.width = width;
		this.cells = [];
	}

	Init()
	{
		$('#textGrid').append('<div class="grid-cell">a</div>');
	}

	Update(dt)
	{
		
	}
}