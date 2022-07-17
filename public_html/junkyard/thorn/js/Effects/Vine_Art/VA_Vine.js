
function Doodle(d) {
	console.log(d);
}


class Vine {

	constructor (count, length, mass, thornCount, pos, element, clone) {
		this.isInit = false;
		this.visible = false;
		this.head = new Node();
		this.nodes = [];
		this.nodesLoaded = false;
		this.thorns = [];
		this.thornCount = thornCount;
		this.thornOffset = [];
		this.IPs = [];
		this.CPs = [];
		this.S = []; //splines
		this.V = []; //vertices

		this.nodeCount = count; 
		this.length = length * count;
		this.mass = mass;
		this.pos = pos;

		this.segLength = length;

		//svg info
		this.element;
		this.index;
		this.blur = 0;
		this.zi = 0;
		this.strokeWidth = 1;
		this.color = "rgba(0,0,0,1)";

		this.dstry = false;


		this.external = true;
		this.Dest = element;
		this.cloneDest = clone;

	}

	Init()
	{
		for(var i = 0; i < this.nodeCount; i++)
		{
			var newNode = new Node();
			this.AddNode(newNode);
		}

		this.head.parent = this;
		this.head.Init(true);

		for(var i = 0; i < this.nodeCount; i++)
		{
			if(i > 0)
			{
				this.nodes[i].SetPrevious(this.nodes[i-1]);
				this.nodes[i-1].SetNext(this.nodes[i]);
			}
			else if(i == 0)
			{
				this.nodes[i].SetPrevious(this.head);
				this.head.SetNext(this.nodes[i]);
			}

			this.nodes[i].Init(false);

		}

		for(var i = 0.0; i < 1.0; i += 1/this.thornCount)
		{
			this.thornOffset.push((i + randomFlt(-.00001,.00001)).clamp(0,1) % 2);
		}

		// for(var i = 0; i < this.nodeCount; i++)
		// {
		// 	this.nodes[i].Init(false);
		// }

		if(this.external)
			$("#vineArt").append('<svg id="vine-' + this.index + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="vine" height="'+$(document).height()*2+'" width="'+$(document).height()*2+'" data-vi="'+this.index+'"></svg>');
		else
			$("#vineArt").append('<object id="vine-' + this.index + '" data="Effects/Vine_Art/Vine.svg" type="image/svg+xml" class="vine" onload="VinesInit(' + this.index + ')" height="'+$(document).height()*2+'" width="'+$(document).height()*2+'" data-vi="'+this.index+'">');


		//$("#vineArt").append('<object id="vine-' + this.index + '" data="Effects/Vine_Art/Vines.svg" type="image/svg+xml" class="vine" onload="VinesInit(' + this.index + ')" height="1000" width="1000" data-vi="'+this.index+'"></div>');

		this.element = $('#vine-' +this.index);
		this.docElement = document.getElementById('vine-' +this.index);

		this.element.css({
			'filter': 'blur('+this.blur+'px)', 
			'z-index':this.zi,
			'position':'absolute'});

		// this.element.fadeIn(10000);

		if(this.external)
		{
			for(var i = 0; i < this.nodeCount; i++)
			{
				this.S[i] = this.CreatePath(this.color);
				if(i == 0)
					this.V[i] = this.CreateKnot(this.head.pos.x, this.head.pos.y);
				else
					this.V[i] = this.CreateKnot(this.nodes[i-1].pos.x, this.nodes[i-1].pos.y);
			}
			
			this.UpdateSplines();
			this.CreateThorns();

			this.isInit = true;

		}

		this.element.css({
			'transition-duration': randomInt(1,3) + 's',
		});

	}

	CreateKnot(x,y)
	{
		var C = document.createElementNS("http://www.w3.org/2000/svg","circle")
		//C.setAttributeNS(null,"r",0)
		C.setAttributeNS(null,"cx",x)
		C.setAttributeNS(null,"cy",y)
		//C.setAttributeNS(null,"fill",vine.color)
		//C.setAttributeNS(null,"stroke","black")
		//C.setAttributeNS(null,"stroke-width","0")
		//C.setAttributeNS(null,"onmousedown","startMove(evt)")
		// this.docElement.appendChild(C);
		this.element.append(C);

		return C;
	}

	CreatePath(color,width)
	{		
		/*width = (typeof width == 'undefined' ? "4" : width);*/
		width = this.strokeWidth;
		var P = document.createElementNS("http://www.w3.org/2000/svg","path");
		P.setAttributeNS(null,"fill","none");
		P.setAttributeNS(null,"stroke",this.color);
		P.setAttributeNS(null,"stroke-width",width);
		// this.docElement.appendChild(P);
		this.element.append(P);

		return P;
	}

	CreateThorns()
	{
			
		var i = 0;
		var flip = 1;
		while(i < this.IPs.length-1)
		{
			var prev = i-1;
			var next = i+1;
			var thisPoint = i;
			//if(randomInt(0,10) > 5)
			//{
			//	if(flip == 1)
			//		flip = -1;
			//	else
			//		flip = 1;
			//}
			//else 
				flip = randomInt(-1,1);

			//flip *= randomFlt(.5,1);

			var scale = this.strokeWidth;

			var g = document.createElementNS("http://www.w3.org/2000/svg","g");
			var T=document.createElementNS("http://www.w3.org/2000/svg","path");
			T.setAttributeNS(null,"d","M0.1,239.6c0,0,21.5-67.4,32.6-94.6c9.3-22.8,45.9-89.2,52.3-99c6.1-9.2-0.8-15-6.6-13.8c-5.8,1.2-36.8,24.1-47.7,16.4c-9-6.3-21.1-28.9-30.2-44.9");
			T.setAttributeNS(null,"fill",this.color);

			this.element.append(g);
			g.appendChild(T);


			this.thorns.push({pp: prev, np: next, p:thisPoint, svg: T, g:g, f:flip});
			//console.log(T);

			var cap = 20/this.strokeWidth;
			if(cap < 4)
				i += randomInt( 1,5);
			else
				i += randomInt(5, 8);

		}
	}


	Update(dt)
	{
		// console.log("update");
		$(this.cloneDest).empty();
		this.head.Update(dt);
		for(var i = 0; i < this.nodeCount && this.nodesLoaded; i++)
		{
			this.nodes[i].Update(dt);
		}

		if(!this.external)
			document.getElementById("vine-" + this.index).contentWindow.updateSplines();
		else
			this.UpdateSplines();


		this.color = $(':root').css("--vine-color");

		// var v = new Vector3(0,0,0);
		// var v1 = new Vector3(-400, 200, 0);

		// var gForce = new Vector3(0, -9.81, 0);
		// var fc = this.mass * (gForce.y * gForce.y) / this.segLength;
		// var Tg = (this.mass * gForce.y) * Math.cos(Angle(this.head.pos, this.nodes[0].pos));

		// console.log(Tg);

		if(this.isInit && !this.visible)
		{
			this.element.css('opacity', 1);
		}



		// Clone For Fogged glass effect
		// var clone = this.cloneDest;

		// $(this.Dest).children().each(function(){
		// 	var child = $(this);
		// 	var clone = child.clone():
		// 	clone.css("filter", 

		// 	$(clone).append(child.clone());

		// });

	}











	/* Gameplan

		pass xy, prev xy, and next xy as parameters to 'computeControlPoints' within the 'updatesplines vertex loop'

	*/






















	UpdateSplines()
	{
	/*grab (x,y) coordinates of the control points*/
		var x = [];
		var y = [];

		this.IPs = [];
		this.CPs = [];


		for (var i=0;i<this.V.length;i++)
		{
			// var x, y, px, py, nx, ny;

			var v = this.V[i];

			if(i == 0)
			{
				v.setAttributeNS(null,"cx",this.head.pos.x);
				v.setAttributeNS(null,"cy",this.head.pos.y);
			}
			else
			{
				v.setAttributeNS(null,"cx",this.nodes[i-1].pos.x);
				v.setAttributeNS(null,"cy",this.nodes[i-1].pos.y);
			}

			/*use parseInt to convert string to int Original*/
			x[i]=parseInt(v.getAttributeNS(null,"cx"));
			y[i]=parseInt(v.getAttributeNS(null,"cy"));



////////////////////////////////////////////////////////////////////////////////////////////
			// x = parseInt(v.getAttributeNS(null,"cx"));
			// y = parseInt(v.getAttributeNS(null,"cy"));

			// if(this.V[i-1] != undefined)
			// {
			// 	px = parseInt(this.V[i-1].getAttributeNS(null,"cx"));
			// 	py = parseInt(this.V[i-1].getAttributeNS(null,"cy"));
			// }

			// if(this.V[i+1] != undefined)
			// {
			// 	nx = parseInt(this.V[i+1].getAttributeNS(null,"cx"));
			// 	ny = parseInt(this.V[i+1].getAttributeNS(null,"cy"));
			// }

			// var ptx = this.ComputeControlPointsMin(i, this.V.length, px,x,nx);
			// var pty = this.ComputeControlPointsMin(i, this.V.length, py,y,ny);

			// if(i < this.V.length - 1)
			// {
			// 	this.S[i].setAttributeNS(null,"d", this.MakePath(x,y,ptx.p1,pty.p1,ptx.p2,pty.p2,nx,ny)); 

			// 	this.AddCtrlPts(ptx.p1,pty.p1,ptx.p2,pty.p2, i);

			// 	this.S[i].setAttributeNS(null, "stroke", this.color);
			// }

////////////////////////////////////////////////////////////////////////////////////////////

			// coords[i]={ x:parseInt(this.V[i].getAttributeNS(null,"cx")), y:parseInt(this.V[i].getAttributeNS(null,"cy"))};

		}
		
		/*computes control points p1 and p2 for x and y direction*/
		var px = this.ComputeControlPoints(x);
		var py = this.ComputeControlPoints(y);






		//console.log(px,py);

		//console.log(IPs);


		//<!-- vine.interpoints = new Array(); -->
		//<!-- vine.ctrlPts = new Array(); -->

		/*updates path settings, the browser will draw the new spline*/
		for (var i=0;i<this.V.length-1;i++)
		{
			this.S[i].setAttributeNS(null,"d", this.MakePath(x[i],y[i],px.p1[i],py.p1[i],px.p2[i],py.p2[i],x[i+1],y[i+1])); 

			this.AddCtrlPts(px.p1[i],py.p1[i],px.p2[i],py.p2[i], i);

			this.S[i].setAttributeNS(null, "stroke", this.color);
		}



		this.UpdateThorns();
	}

	// index, vertex count, previous previous, previous, current, next, next next, Point Set;
	ComputeControlPointsMin(i, vc, p, curr, n, set)
	{
		var p1, p2, np1, np2;
		
		/*rhs vector*/
		var a, b, c, r;
		var pa, pb, pc, pr;
		var na, nb, nc, nr;
		
		
		if(i == 0) /*left most segment*/
		{
			a = 0;
			b = 2;
			c = 1;
			r = curr + 2 * n; // first x + 2 * second x

			nb = 2;
			nr = 4 * curr + 2 * n;
		}
		else if (i > 0 && i < vc - 2) /*internal segments*/
		{
			a = 1;
			b = 4;
			c = 1;
			r = 4 * curr + 2 * n; // current x + 2 * next x

			pa = 0;
			pb = 2;
			pc = 1;
			pr = p + 2 * curr;

			nb = 7;
			nr = 4 * curr + 2 * n;
		}
		else if(i == vc - 2) /*right segment*/
		{
			a = 2;
			b = 7;
			c = 0;
			r = 8 * p + curr; // 8 * second to last x + last x

			pa = 1;
			pb = 4;
			pc = 1;
			pr = 4 * p + 2 * curr;

			nb = 2;
			nr = 4 * curr + 2 * n;
		}

		/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
		if(i > 0 && i < vc - 1)
		{
			var m = a / pb;
			b = b - m * pc;
			r = r - m * pr;
		}
		// for (var i = 1; i < n; i++)
		// {
		// 	var m = a[i]/b[i-1];  // m = a / prev b
		// 	b[i] = b[i] - m * c[i - 1];  // b = b - m * prev c
		// 	r[i] = r[i] - m*r[i-1];  // r = r - m * prev r
		// 	m = 0;
		// }

		np1 = nr/nb;
		if(i >= 0)
			p1 = (r - c * np1) / b;

		// if(i < vc - 2)
			p2 = 2 * n - np1;


	 	//    vc-2    vc-2    vc-2
		// p1[n-1] = r[n-1]/b[n-1];  // prev p1 = prev r / prev b;
		// for (var i = n - 2; i >= 0; --i)
		// 	p1[i] = (r[i] - c[i] * p1[i+1]) / b[i]; //prev prev p1 = (prev r - prev c * next p1) / b
			
		// /*we have p1, now compute p2*/
		// for (var i=0;i<n-1;i++)
		// 	p2[i]=2*K[i+1]-p1[i+1];
		
		// p2[n-1]=0.5*(K[n]+p1[n-1]);


		return {p1:p1, p2:p2};
	}

	ComputeControlPoints(K)
	{

		var p1=new Array();
		var p2=new Array();
		var n = K.length-1;
		
		/*rhs vector*/
		var a=new Array();
		var b=new Array();
		var c=new Array();
		var r=new Array();
		
		/*left most segment*/
		a[0]=0;
		b[0]=2;
		c[0]=1;
		r[0] = K[0]+2*K[1];
		
		/*internal segments*/
		for (i = 1; i < n - 1; i++)
		{
			a[i]=1;
			b[i]=4;
			c[i]=1;
			r[i] = 4 * K[i] + 2 * K[i+1];
		}
				
		/*right segment*/
		a[n-1]=2;
		b[n-1]=7;
		c[n-1]=0;
		r[n-1] = 8*K[n-1]+K[n];
		
		/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
		for (var i = 1; i < n; i++)
		{
			var m = a[i]/b[i-1];
			b[i] = b[i] - m * c[i - 1];
			r[i] = r[i] - m*r[i-1];
			m = 0;
		}
	 
		p1[n-1] = r[n-1]/b[n-1];
		for (var i = n - 2; i >= 0; --i)
			p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
			
		/*we have p1, now compute p2*/
		for (var i=0;i<n-1;i++)
			p2[i]=2*K[i+1]-p1[i+1];
		
		p2[n-1]=0.5*(K[n]+p1[n-1]);

		return {p1:p1, p2:p2};
	}

	MakePath(x1,y1,px1,py1,px2,py2,x2,y2)
	{
		return "M "+x1+" "+y1+" C "+px1+" "+py1+" "+px2+" "+py2+" "+x2+" "+y2;
	}

	UpdateThorns()
	{
		for(var i = 0; i < this.thorns.length; i++)
		{
			var t = this.thorns[i];
			var p = this.IPs[t.p];
			var pp = this.IPs[t.pp];
			var np = this.IPs[t.np];
			var scale = this.strokeWidth/60;
			var flp = t.f;
			var a;

			if(pp == undefined)
			{
				a = VineAngle(p, np);
			}
			else if(np == "undefined")
			{
				a = VineAngle(pp, p);
			}
			else
			{
				a = VineAngle(pp, np);
			}

			t.g.setAttributeNS(null, "transform", "translate("+ (p.x + (flp)) +" "+ p.y +") scale("+(scale*flp)+" "+scale+") rotate("+((a-90) * flp)+")");


			t.svg.setAttributeNS(null, "fill", this.color);
		}
	}

	AddCtrlPts(p1x, p1y, p2x, p2y, i)
	{
		// CPs.push({f:{x:p1x, y:p1y}, s: {x:p2x,y:p2y}})
		var c1 = {x:p1x, y:p1y}, c2 = {x:p2x,y:p2y};

		var s, e;

		if(i == 0)
		{
			s = this.head.pos; 
			e = this.nodes[i].pos;
		}
		else
		{
			s = this.nodes[i-1].pos; 
			e = this.nodes[i].pos;
		}

		InterpolatePoints(s,c1,c2,e,i,this);
	}





	// Draw(ctx)
	// {

	// 	//this.head.Draw(ctx);
	// 	// for(var i = 0; i < this.nodeCount; i++)
	// 	// {
	// 	// 	//this.nodes[i].Draw(ctx);
	// 	// }

	// 	// for(var i = 0; i < this.ctrlPts.length; i++)
	// 	// {

	// 	// 	var p = this.ctrlPts[i];
	// 	// 	ctx.beginPath();
	// 	// 	ctx.arc(p.f.x, p.f.y, 4, 0, 2 * Math.PI);
	// 	// 	ctx.stroke();
	// 	// }

	// 	// for(var i = 0; i < this.interpoints.length-1; i++)
	// 	// {
	// 	// 	var p = this.interpoints[i];
	// 	// 	ctx.beginPath();
	// 	// 	ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
	// 	// 	ctx.fill();
	// 	// }
	// }

	AddNode(node)
	{
		node.parent = this;
		this.nodes.push(node);
	}

	// FollowMouse(e)
	// {
	// 	this.pos = new Vector3(e.pageX, e.pageY);

	// 	this.head.pos.x = e.pageX;
	// 	this.head.pos.y = e.pageY;

	// }

	Follow(pos)
	{
		this.pos = pos;

		this.head.pos = pos;
	}

	Translate(x, y)
	{
		// var xPos = ((parseInt(this.element.css("width"))*.5) * ((x * .5) - .5)) * this.pos.z;
		var pgWrapper = $("#page_wrapper");
		var dx = (x * pgWrapper.width() * this.pos.z);

		// console.log(dx);
		this.element.css({"left":  parseInt(this.element.css("left")) + dx + "px"});
	}

	ApplyWind(force, dir)
	{
		// if(this.isInit && this.nodesLoaded)
		// for(var i = 0; i < this.nodeCount; i++)
		// {
		// 	if(this.nodes[i] != null && i%2 == 0)
		// 	{
		// 		if(randomInt(0, 1000) > 900)
		// 		else
		// 			this.nodes[randomInt(0, this.nodeCount-1)].ApplyWind(force,dir);
		// 	}
		// }
		// this.nodes[0].AddForce(force, dir);
		// this.nodes[0].aAccel += -force * this.mass;
		this.head.ApplyWind(force,dir);

		// if(randomInt(0, 1000) > 500)
		// 	for(var i = 0; i < this.nodeCount * .1; i++)
		// 		this.nodes[randomInt(0, this.nodeCount-(this.nodeCount * .25))].ApplyWind(force,dir);
	}

	SetSvg(sw, sc, blr, zi = 0)
	{
		this.strokeWidth = sw;
		this.color = sc;
		this.blur = blr;
		this.pos.z = (sw + blr) * .05;

		this.zi = zi;
	}

	Destroy()
	{

		this.dstry = true;

		this.element.css('opacity', 0);

	}

}
