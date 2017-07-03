/*function simulation(drawing,div){
  this.drawing = drawing;
  this.div = div;
  this.div.appendChild(this.drawing.canvas);

  this.start = function(){
    this.drawing.ctx.clearRect(0,0,this.drawing.canvas.height,this.drawing.canvas.width);
    this.drawing.draw_polygons();
    console.log(this.drawing.solution.route);
    var b = new boot(5,this.drawing.solution.route,1000,this.div);
  }

}*/

function boot(n,route,time,div){
  this.route = route;
  this.time = time;
  this.div = div;
  this.n = n;
  this.origin = {x:0,y:0};
  this.position=-1;
  this.moves=[];

  this.start = function(){
    if(route.length<1)
      return;
    this.origin = route[0];
    this.position = 0;
    this.init();
    var t = setInterval(function(){
      this.move(this.position);
      this.position++;
    },this.time);
  }

  this.stop = function(){

  }

  this.pause = function(){

  }

  this.play = function(){

  }

  this.init = function(){

  }
}

/*var e = [];
var ind =0;
var sim_canvas = null;

function sim(space,div){
  sim_canvas = space.canvas;
  space.ctx.clearRect(0,0,space.canvas.height,space.canvas.width);
  space.draw_polygons();
  for( i in space.solution.route){
    for(var j=0;j<space.solution.tree.nodes.length;j++){
      if(space.solution.tree.nodes[j].id == space.solution.route[i]){
        var n = space.solution.tree.nodes[j].node;
        e.push(space.nodes[n]);
      }
    }
  }
  var z = setInterval(function(){
    var position=e[0];
    var rot = 0;
    var options = {
      position:position,rotation:rot,sides:5,scale:50
    }
    paint_bot(options,sim_canvas);
    div.appendChild(sim_canvas);
    ind++;
  },1000);
}

function paint_bot(options,canvas){
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#6ab150";
  ctx.strokeStyle = "black";
  var R = options.scale;
  var L = options.sides;
  var rad = (2*Math.PI)/L;
  ctx.translate(options.position.x,options.position.y);
  ctx.rotate(3*Math.PI/2);  // dibuja el trazado
  ctx.beginPath();
  		for( var i = 0; i < L; i++ ){
  		x = R * Math.cos( rad*i );
  		y = R * Math.sin( rad*i );
  		ctx.lineTo(x, y);
  		}
  ctx.closePath();
  ctx.fill();
}*/
