


class Node {
	constructor ()
	{
		this.pos = new Vector3(0,0,0);
		this.mass;
		this.previousNode = null;
		this.nextNode = null;
		this.parent;
		this.isFixed = false;

		this.angle;
		this.curveAngle;
		this.aAccel = 0;
		this.aVel = 0;
	}

	Init(fixed)
	{
		this.mass = this.parent.mass;
		this.isFixed = fixed;

		var pn = this.previousNode;
		var nn = this.nextNode;

		if(pn == null)
		{
			this.pos = this.parent.pos;
			this.angle = randomInt(290,300);
			this.curveAngle = randomFlt(-3, 3);
		}
		else
		{
			this.angle = pn.angle + pn.curveAngle;
			this.curveAngle = pn.curveAngle + randomFlt(-.5,.5);
		}

		if(this.nextNode == null)
		{
			this.parent.nodesLoaded = true;
		}
	}

	SetPrevious(node)
	{
		this.previousNode = node;

		var segLength = this.parent.segLength;
		var initDir = new Vector3(-1,1,0);
		// var pos = this.pos.Add(initDir.Mults(segLength,1).Divs(initDir.Mults(segLength, 1).Mag(),1).Mults(segLength,1),1);
	}

	SetNext(node)
	{
		this.nextNode = node;
	}

	ApplyWind(force, dir)
	{
		this.aAccel += (-force/this.mass) * Math.cos(Math.radians(this.angle));
	}

	Update(dt)
	{
		if(this.parent.nodesLoaded)
		{
			if(this.previousNode)
			{
				this.pos.x = this.previousNode.pos.x + (this.parent.segLength * Math.sin(Math.radians(this.angle)));
				this.pos.y = this.previousNode.pos.y + (this.parent.segLength * Math.cos(Math.radians(this.angle)));


				var diff = this.angle - this.previousNode.angle;

				this.angle -= diff/17.5;
			}
			else
			{
				this.aAccel += -9.81 * this.mass * Math.sin(Math.radians(this.angle));
				this.angle += this.aAccel * dt;
				this.aAccel *= .997;
			}

		}
	// 	// ctx.beginPath();
	// 	// ctx.arc(this.pos.x, this.pos.y, this.mass, 0, 2 * Math.PI);
	// 	// ctx.fill();


	// 	// ctx.beginPath();
	// 	// ctx.moveTo(this.pos.x, this.pos.y);
	// 	// if(this.nextNode != null)
	// 	// ctx.lineTo(this.nextNode.pos.x, this.nextNode.pos.y);
	// 	// ctx.lineWidth = this.mass * 2;
	// 	// ctx.stroke();
	// 	// ctx.strokeStyle = "rgb("+ this.velocity.Mag() +"," + this.velocity.Mag()/50 + ","+ this.velocity.Mag()/50 + ")";
	}

}