class Shift_Effect{
	constructor()
	{
		this.text_objs = [];
	}


	ShiftY(id, posy, time)
	{
		for(var i = 0; i < this.text_objs.length; i++)
		{
			for(var j = 0; j < this.text_objs[i].chars.length; j++)
			{
				this.text_objs[i].chars[j].element.css({
					'transition-timing-function': 'cubic-bezier('+randomFlt(0,.5)+',0,'+randomFlt(0,.5)+',1)',
					'transition-duration': time + 's'
				});
				this.text_objs[i].chars[j].pos.y = posy;
			}
		}
	}

	Update(dt)
	{
		for(var i = 0; i < this.text_objs.length; i++)
		{
			this.text_objs[i].Update(dt);
		}	
	}

	AddObj(obj)
	{
		this.text_objs.push(obj);
	}
}