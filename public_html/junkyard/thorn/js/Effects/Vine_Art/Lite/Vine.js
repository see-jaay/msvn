

class Vine {

	constructor (count, length, mass, thornCount, stroke, pos, angle, deviation) {
		this.isInit = false;
		this.visible = false;
		this.head = new Node();
		this.nodes = [];
		this.nodesLoaded = false;
		this.thorns = [];
		this.transforms = [];
		this.ts = [];
		this.thornCount = thornCount;
		this.thornOffset = [];
		this.IPs = [];
		this.CPs = [];
		this.paths = [];
		this.splines = []; //splines for context drawing
		this.V = []; //vertices

		this.nodeCount = count;
		this.length = length * count;
		this.mass = mass;
		this.pos = pos;
		this.angle = angle;
		this.deviation = deviation;

		this.segLength = length;

		//svg info
		this.element;
		this.index;
		this.blur = 0;
		this.zi = 0;
		this.opacity = 1;
		this.strokeWidth = stroke;
		this.color = "rgba(0,0,0,1)";

		this.dstry = false;


		this.external = true;


		this.cvLim = [];
	}

	Init()
	{
		for(var i = 0; i < this.nodeCount; i++)
		{
			var newNode = new Node();
			this.AddNode(newNode);
		}

		this.head.parent = this;
		this.head.Init(true, this.pos, this.angle);

		// this.deviation = this.pos.z;

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

		for(var i = 0.0; i < 1.0; i += 1/this.thornCount/4)
		{
			this.thornOffset.push((i + randomFlt(-.00001,.00001)).clamp(0,1) % 2);
		}

		if(this.external)
		{
			for(var i = 0; i < this.nodeCount; i++)
			{
				if(i == 0)
					this.V[i] = [this.head.pos.x, this.head.pos.y];
				else
					this.V[i] = [this.nodes[i-1].pos.x, this.nodes[i-1].pos.y];
			}

			this.UpdateSplines();
			this.CreateThorns();

			this.isInit = true;

		}
	}

	CreateThorns()
	{

		var i = 0;
		var flip = randomInt(-1,1);
		while(i < this.IPs.length-1)
		{
			var prev = i-1;
			var next = i+1;
			var thisPoint = i;

			// flip = randomInt(-1,1);
			flip = (flip > 0) ? -1 : 1;

			var scale = this.strokeWidth;

			this.thorns.push({pp: prev, np: next, p:thisPoint, f:flip, t:""});
			//console.log(T);

			var cap = 20/this.strokeWidth;
			if(cap < 4)
				i += randomInt( 1,5);
			else
				i += randomInt(5, 8);

		}
	}


	Update(dt, pos)
	{
		this.head.Update(dt);

		for(var i = 0; i < this.nodeCount && this.nodesLoaded; i++)
		{
			this.nodes[i].Update(dt);

		}

		this.UpdateSplines();
		this.UpdateThorns();

	}

	ReInit(pos){
		this.head.pos.x = pos[0];
		this.head.pos.y = pos[1];
	}

	UpdateSplines(cvx1, cvx2, cvy1, cvy2)
	{
	/*grab (x,y) coordinates of the control points*/
		var x = [];
		var y = [];

		this.IPs = [];
		this.CPs = [];

		// var x1 = (this.cvLim[0] / 1.3) - this.segLength;
  // 		var x2 = (this.cvLim[1] / 1.3) + this.segLength;
  // 		var y1 = (this.cvLim[2] / 1.3) - this.segLength;
  // 		var y2 = (this.cvLim[3] / 1.3) + this.segLength;


		for (var i=0;i<this.V.length;i++)
		{
			var v = this.V[i];
			var vn = this.V[i+1];
			var vp = this.V[i-1];

			if(i == 0)
			{
				v[0] = this.head.pos.x;
				v[1] = this.head.pos.y;
			}
			else
			{
				v[0] = this.nodes[i-1].pos.x;
				v[1] = this.nodes[i-1].pos.y;
			}

			// if( ( (v[0] > x1 && v[0] < x2) && (v[1] > y1 && v[1] < y2) ) ||
			// 	( vn && (vn[0] > x1 && vn[0] < x2) && (vn[1] > y1 && vn[1] < y2) ) ||
			// 	( vp && (vp[0] > x1 && vp[0] < x2) && (vp[1] > y1 && vp[1] < y2) ) )
			// {
			/*use parseInt to convert string to int Original*/
				x[i]= v[0];
				y[i]= v[1];
			// }
		}

		/*computes control points p1 and p2 for x and y direction*/
		var px = this.ComputeControlPoints(x);
		var py = this.ComputeControlPoints(y);


		for (var i=0;i<this.V.length-1;i++)
		{
			//this.paths[i] = this.MakePath(x[i],y[i],px.p1[i],py.p1[i],px.p2[i],py.p2[i],x[i+1],y[i+1]);

			// var x1 = x[i], y2 = y[i];
			// var x2 = x[i+1], y2 = y[i+1];
				this.splines[i] = [x[i],y[i],px.p1[i],py.p1[i],px.p2[i],py.p2[i],x[i+1],y[i+1]];

			this.AddCtrlPts(px.p1[i],py.p1[i],px.p2[i],py.p2[i], i);
		}

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
		return "M "+x1.toFixed(2)+" "+y1.toFixed(2)+" C "+px1.toFixed(2)+" "+py1.toFixed(2)+" "+px2.toFixed(2)+" "+py2.toFixed(2)+" "+x2.toFixed(2)+" "+y2.toFixed(2);
	}

	UpdateThorns()
	{
		this.transforms = [];
		this.ts = [];


		var x1 = (this.cvLim[0] ) - this.segLength;
  		var x2 = (this.cvLim[1]) + this.segLength;
  		var y1 = (this.cvLim[2]) - this.segLength;
  		var y2 = (this.cvLim[3]) + this.segLength;

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
			// console.log(this.thornTForms);

			if((p.x > x1 && p.x < x2) && (p.y > y1 && p.y < y2))
			{
				// this.ts.push( (p.x + (flp)).toFixed(2) +","+ p.y.toFixed(2) +"~"+(scale * flp).toFixed(2) +","+ scale.toFixed(2) +"~"+ ((a-90) * flp).toFixed(2) );
				this.ts.push([ [(p.x + (flp)).toFixed(2), p.y.toFixed(2)], [(scale * flp).toFixed(2), scale.toFixed(2)], ((a-90) * flp).toFixed(2) ]);

			}

			// this.transforms.push(("translate("+ (p.x + (flp)).toFixed(2) +" "+ p.y.toFixed(2) +") scale("+(scale*flp).toFixed(2)+" "+scale.toFixed(2)+") rotate("+((a-90) * flp).toFixed(2)+")"));
			//t.t = "translate("+ (p.x + (flp)).toFixed(2) +" "+ p.y.toFixed(2) +") scale("+(scale*flp).toFixed(2)+" "+scale.toFixed(2)+") rotate("+((a-90) * flp).toFixed(2)+")";
		}

		// console.log(this.ts);
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

		// this.InterpolatePoints(s,c1,c2,e,i);
		InterpolatePoints(s,c1,c2,e,i,this);
	}

	InterpolatePoints(s, c1,c2,e,i)
	{
		for (var t = 0.0; t <= 1.0; t += this.pos.z * .001) {
	    	// var point = {BezierInterpolation(t, s.x, c1.x, c2.x, e.x), BezierInterpolation(t, s.y, c1.y, c2.y, e.y), 0);
			this.IPs.push({x:BezierInterpolation(t, s.x, c1.x, c2.x, e.x), y:BezierInterpolation(t, s.y, c1.y, c2.y, e.y), z:0});
		}
	}

	AddNode(node)
	{
		node.parent = this;
		this.nodes.push(node);
	}

	ApplyWind(force, dt)
	{
		this.head.ApplyWind(force,dt);
	}

	SetSvg(sw, sc, blr, zi = 0, opacity)
	{
		this.strokeWidth = sw;
		this.color = sc;
		this.blur = blr;
		this.pos.z = (sw + blr) * .05;
		this.opacity = opacity;

		this.zi = zi;
	}

}
