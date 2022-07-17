class Node {
	constructor ()
	{
		this.pos = new Vector3(0,0,0);
		this.mass;
		this.previousNode = null;
		this.nextNode = null;
		this.parent;
		this.isFixed = false;
		// this.velocity = new Vector3(0,0,0);
		// this.accel = new Vector3(0,0,0);
		// this.netForce = new Vector3(0,0,0);


		this.angle = 295;
		this.aAccel = 0;
		this.aVel = 0;
	}

	Init(fixed)
	{
		this.mass = this.parent.mass;
		this.isFixed = fixed;

		if(this.previousNode == null)
		{
			this.pos = this.parent.pos;
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

	CorrectPos(dt)
	{

		var prevSegDist = new Vector3(0,0,0), stretchPrev = 0;

		if(this.previousNode != null)
			prevSegDist = this.pos.Sub(this.previousNode.pos, 1);

		// stretchPrev = (prevSegDist.Mag() - this.parent.segLength);

		var prevSegDir = prevSegDist.Divs(prevSegDist.Mag(),1);




		// for(var i = 0; i < 4; i++)
		// {
			// var angle = Angle(this.previousNode.pos, this.pos);

			// if(angle-90 > this.parent.flex)
			// {
			// 	this.pos.Add(prevSegDir.Cross(new Vector3(0,0,1),1).Mults(-.25,1).Mults(dt*50,1) );
			// }
			
			// if(angle-90 < -this.parent.flex)
			// {
			// 	this.pos.Add(prevSegDir.Cross(new Vector3(0,0,1),1).Mults(.25,1).Mults(dt*50,1) );
			// }
		// }

		// if(prevSegDist.Mag() > this.parent.segLength)
		// this.pos.Add(prevSegDir.Mults(stretchPrev,1).Mults(dt*100,1));
	}























////  STOP WHAT YOURE DOING!!!!! ////

/* 
	
	A Simpler Solution would be to apply forces to the first node. 

	Even simpler would be to change the angle of the first node MANUALLY 
	#Dont BE AFFRAID TO DO THINGS SIMPLER.

	then lerp the next nodes angle to equal the previous nodes angle.

	- CJ

 */



















	








	// CalcNetForce(dt)
	// {
	// 	var prevSegDist = new Vector3(0,0,0), nextSegDist = new Vector3(0,0,0),
	// 		stretchPrev = 0, stretchNext = 0;

	// 	if(this.previousNode != null)
	// 		prevSegDist = this.previousNode.pos.Sub(this.pos, 1);
	// 	else
	// 		prevSegDist = new Vector3(this.pos.x, this.pos.y - this.segLength, 0).Sub(this.pos,1);

	// 	if(this.nextNode != null)
	// 		nextSegDist = this.nextNode.pos.Sub(this.pos,1);

	// 	var prevSegDir = prevSegDist.Divs(prevSegDist.Mag(),1);
	// 	var nextSegDir = nextSegDist.Dir();

	// 	stretchPrev = (prevSegDist.Mag() - this.parent.segLength);
	// 	stretchNext = (nextSegDist.Mag() - this.parent.segLength);

	// 	if(this.previousNode == this.parent.head)
	// 	{
	// 		// console.log(Angle(this.previousNode.pos, this.pos)-90);

	// 		// console.log(prevSegDir.Cross(new Vector3(0,0,1),1));
	// 		// this.AddForce(20,prevSegDir.Cross(new Vector3(0,0,1),1) );
	// 	}

	// 	// console.log(this.previousNode.pos);
	// 	// if(prevSegDist.Mag() < this.parent.segLength)
	// 	// {t
	// 	// 	stretchPrev *=-1;
	// 	// 	stretchNext *= -1;
	// 	// }

	// 	// var prevTension = prevSegDir.Mults(this.parent.tension * stretchPrev,1);
	// 	// var nextTension = nextSegDir.Mults(this.parent.tension * stretchNext,1);
	// 	// var gForce = new Vector3(0, 12.81, 0);


	// 	// var prevTension = prevSegDir.Mults(stretchPrev,1);
	// 	// var nextTension = nextSegDir.Mults(gForce.y,1);


	// 	//this.netForce = this.netForce.Add(gForce,1);
		
	// 	//var Tension = this.netForce.Mag() * Math.cos(Angle(this.previousNode.pos, this.pos));
		
	// 	//mg sinθ


	// 	// console.log(9.81 * Math.sin(Angle(this.previousNode.pos, this.pos)));
	// 	// var t = (9.81 * this.mass) * Math.sin(Angle(this.previousNode.pos, this.pos));

	// 	// console.log(t, Angle(this.previousNode.pos, this.pos));
	// 	// console.log(Math.sin(0));

	// 	// this.AddForce(t, prevSegDir);
	// 	// this.AddForce(9.81 * this.mass, new Vector3(0,1,0));

	// 	var prevTheta = Angle(this.previousNode.pos, this.pos);

	// 	var gForce = 9.81 * this.mass;
	// 	var tension = gForce * Math.cos(180 - prevTheta);
	// 	var tangentForce = gForce * Math.sin(prevTheta);
	// 	console.log(tangentForce);


	// 			// this.AddForce(tension, prevSegDir);		
	// 			// this.AddForce(tension, prevSegDir.Neg());
	// 			// this.netForce = this.netForce.Add(tangentForce, prevSegDir.Cross(new Vector3(0,0,1),1),1);
	// 			this.AddForce(tangentForce, prevSegDir.Cross(new Vector3(0,0,1),1));

	// 	// this.AddForce(gForce, new Vector3(0,1,0));

	// 	// this.netForce = this.netForce.Add(prevSegDir.Mults(Tension,1).Neg(),1);

	// 	// this.AddForce(Tension,prevSegDir.Neg());



	// 	// console.log(this.netForce);

	// 	// this.velocity.Mult(prevSegDist.Divs(this.parent.segLengh,1));
		
	// 	// this.velocity.Add(this.netForce.Divs(this.mass,1).Mults(dt,1));
	// }

	// CalcAccel(dt)
	// {


	// 	this.accel = this.netForce.Divs(this.mass, 1);
	// 	this.velocity = this.velocity.Add(this.accel,1);
	// 	this.accel.Mults(.99);



	// 	// this.accel = new Vector3(0,0,0);
	// }

	// AddForce(force, dir)
	// {
	// 	// this.netForce.Add(dir.Dir().Mults(force, 1));

	// }

	ApplyWind(force, dir)
	{
		// var prevSegDist = new Vector3(0,0,0), nextSegDist = new Vector3(0,0,0), stretchPrev = 0;

		// if(this.previousNode != null)
		// 	prevSegDist = this.previousNode.pos.Sub(this.pos, 1);

		// if(this.nextNode != null)
		// 	nextSegDist = this.nextNode.pos.Sub(this.pos, 1);

		// var prevSegDir = prevSegDist.Divs(prevSegDist.Mag(),1);
		// var nextSegDir = nextSegDist.Divs(nextSegDist.Mag(),1);



		// if(this.previousNode != null)
		// {
		// 	// this.previousNode.AddForce(force * .3, dir);
		// 	this.previousNode.AddForce(force*.2, prevSegDir.Cross(new Vector3(0,0,1),1).Add(dir,1));
		// }

		// if(this.nextNode != null)
		// {
		// 	// this.nextNode.AddForce(force * .8, dir);
		// 	this.nextNode.AddForce(force*.6, nextSegDir.Cross(new Vector3(0,0,1),1).Neg().Add(dir,1));
		// }



		if(this.previousNode == this.parent.head)
			this.aAccel += (-force * this.mass);

		// this.AddForce(force,dir);

		// console.log(force);
	}

	Update(dt)
	{
		if(!this.isFixed && this.parent.nodesLoaded)
		{
			// this.CalcNetForce(dt);
			// this.CalcAccel(dt);

			// // this.CorrectPos(dt);



			// this.pos = this.pos.Add(this.velocity.Mults(dt,1),1);
				
			// this.velocity.Mults(.5);


		// if(this.velocity.Mag() > this.previousNode.velocity.Mag() )
			// this.velocity.Mults(.5);



			// this.accel = new Vector3(0,0,0);
			// this.velocity = new Vector3(0,0,0);



			this.pos.x = this.previousNode.pos.x + (this.parent.segLength * Math.sin(Math.radians(this.angle)));
			this.pos.y = this.previousNode.pos.y + (this.parent.segLength * Math.cos(Math.radians(this.angle)));



			// if(Math.abs(this.aVel) > 200)
			// {
			// 	this.aVel  = 0;
			// 	this.aAccel = 0;
			// 	this.angle = 270;
			// }
			if(this.previousNode == this.parent.head)
			{
				// this.angle += this.aAccel * dt;

			this.aAccel += -9.81 * this.mass * Math.sin(Math.radians(this.angle));

			this.angle += this.aVel * dt;
			this.aVel += this.aAccel;

			this.aVel *= .999;
			}
			else
			{

				if(this.previousNode != null)
				{
					var a = this.angle;
					var prev = this.previousNode.angle;

					var diff = a - prev;

					// if(a > preva)
						// this.aAccel = -1;
					this.angle -= diff/20;

					// this.angle = preva;
				}
			}

			this.aAccel = 0;

		}




	}

	// Draw(ctx){

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
	// }

}