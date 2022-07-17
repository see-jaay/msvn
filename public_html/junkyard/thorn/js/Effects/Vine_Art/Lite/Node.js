


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
		this.linearAngle;
		this.curveAngle;
		this.aAccel = 0;
		this.aVel = 0;
	}

	Init(fixed, pos, angle)
	{
		this.mass = this.parent.mass;
		this.isFixed = fixed;

		var pn = this.previousNode;
		var nn = this.nextNode;

		if(pn == null)
		{
			this.pos = pos;
			this.angle = angle;
			this.linearAngle = 0;
			this.curveAngle = 0;
			this.initangle = this.angle;

			this.linAccel = 0;
		}
		else
		{
			this.angle = pn.angle + pn.curveAngle;
			this.curveAngle = pn.curveAngle;
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

	ApplyWind(force, dt)
	{
		this.aAccel += -(force  * Math.cos(Math.radians(this.angle)));
		this.linAccel += force;
		// this.aAccel += force;
		// this.aAccel += (this.initangle - this.angle) * (force/this.mass);
		// this.linAccel += -force/this.mass;
		// this.modifier +=
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

				this.angle -= diff/20;
			}
			else
			{

				this.aAccel += ((this.angle > 0 ) ? -9.81 : 9.81)/this.mass;
				this.linAccel -=(this.angle-this.initangle) * 9.81 * dt;

				if(this.angle <=-90)
				{
					// this.linAccel = 0;
					this.aAccel = 0
					// this.angle = -85;
				}
				else if(this.angle > -30)
				{

					// this.linAccel = 0;
					this.aAccel = 0
				}

				this.linearAngle += this.aAccel / this.mass;

				this.angle = this.initangle + this.linAccel;

				this.aAccel *= .999;
				// this.linAccel *= .9;


				// this.aAccel -= this.mass * -9.81 * Math.sin(Math.radians(this.angle)-Math.radians(this.initangle));
				// this.aVel += this.aAccel;

				// this.angle += this.aVel * dt;

				// this.aAccel *- .999;
			}







			// if(Math.abs(this.aVel) > 200)
			// {
			// 	this.aVel  = 0;
			// 	this.aAccel = 0;
			// 	this.angle = 270;
			// }







			// if(this.previousNode == this.parent.head)
			// {

			// 	// this.angle += this.aAccel * dt;

			// 	this.aAccel += -9.81 * this.mass * Math.sin(Math.radians(this.angle));

			// 	this.angle += this.aVel * dt;
			// 	this.aVel += this.aAccel;

			// 	this.aVel *= .999;
			// }
			// else
			// {

			// 	if(this.previousNode != null)
			// 	{
			// 		this.pos.x = this.previousNode.pos.x + (this.parent.segLength * Math.sin(Math.radians(this.angle)));
			// 		this.pos.y = this.previousNode.pos.y + (this.parent.segLength * Math.cos(Math.radians(this.angle)));

			// 		var a = this.angle;

			// 		var prev = this.previousNode.angle;

			// 		var diff = a - prev;

			// 		// if(a > preva)
			// 			// this.aAccel = -1;
			// 		this.angle -= diff/20;

			// 		// this.angle = preva;
			// 	}
			// }

			// this.aAccel = 0;
		}
	}

}
