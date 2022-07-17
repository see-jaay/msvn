class Roll_Effect {
	constructor()
	{
		this.text_objs = [];
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