
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
		this.thornTForms = ['null'];
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

	Init(vw)
	{
		$("#vineArt").append('<svg id="vine-' + this.index + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="vine" height="'+$(document).height()*2+'" width="'+$(document).height()*2+'" data-vi="'+this.index+'"></svg>');

		this.element = $('#vine-' +this.index);
		this.docElement = document.getElementById('vine-' +this.index);

		this.element.css({
			'filter': 'blur('+this.blur+'px)', 
			'z-index':this.zi,
			'position':'absolute',
			'opacity': this.opacity
		});

		for(var i = 0; i < vw.V.length; i++)
		{
			this.S[i] = this.CreatePath(this.color);

			this.V[i] = this.CreateKnot(vw.V[i][0], vw.V[i][1]);
		}
		
		this.CreateThorns(vw.thorns);
		this.UpdateSplines(vw.paths,vw.V,vw.thorns);

		this.isInit = true;


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

	CreatePath(color)
	{		
		/*width = (typeof width == 'undefined' ? "4" : width);*/
		var width = this.strokeWidth;
		var P = document.createElementNS("http://www.w3.org/2000/svg","path");
		P.setAttributeNS(null,"fill","none");
		P.setAttributeNS(null,"stroke",this.color);
		P.setAttributeNS(null,"stroke-width",width);
		// this.docElement.appendChild(P);
		this.element.append(P);

		return P;
	}

	Update(paths, transforms, vertLength)
	{
		this.color = $(':root').css("--vine-color");

		this.UpdateSplines(paths, vertLength);
		this.UpdateThorns(transforms);

		// if(this.isInit && !this.visible)
		// {
		// 	this.element.css('opacity', 1);
		// }
	}

	UpdateSplines(paths, vertLength)
	{

		/*updates path settings, the browser will draw the new spline*/
		for (var i=0;i<vertLength-1;i++)
		{
			this.S[i].setAttributeNS(null,"d", paths[i]); 

			this.S[i].setAttributeNS(null, "stroke", this.color);
		}

	}


	CreateThorns(thorns)
	{
			
		for(var i = 0; i < thorns.length; i++) {
			var g = document.createElementNS("http://www.w3.org/2000/svg","g");
			var T=document.createElementNS("http://www.w3.org/2000/svg","path");
			T.setAttributeNS(null,"d","M0.1,239.6c0,0,21.5-67.4,32.6-94.6c9.3-22.8,45.9-89.2,52.3-99c6.1-9.2-0.8-15-6.6-13.8c-5.8,1.2-36.8,24.1-47.7,16.4c-9-6.3-21.1-28.9-30.2-44.9");
			T.setAttributeNS(null,"fill",this.color);

			this.element.append(g);
			g.appendChild(T);

			this.thorns.push({svg: T, g:g});
		}
	}

	UpdateThorns(transforms)
	{
		for(var i = 0; i < transforms.length; i++)
		{
			var t = this.thorns[i];

			t.g.setAttributeNS(null, "transform", transforms[i]);

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

	SetSvg(sw, sc, blr, zi = 0, opacity)
	{
		this.strokeWidth = sw;
		this.color = sc;
		this.blur = blr;
		// this.pos.z = (sw + blr) * .05;
		this.opacity = opacity;

		this.zi = zi;
	}

	Destroy()
	{

		this.dstry = true;

		this.element.css('opacity', 0);

	}

}
