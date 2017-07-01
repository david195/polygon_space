function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function importScript(nombre) {
    var s = document.createElement("script");
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}

importScript('js/convexhull.js');

function draw_space(div,height,width){
<<<<<<< HEAD
  this.inode = -1;
  this.gnode = -1;
=======
  this.solution = {};
>>>>>>> 42c309adab2ac9b223d3e2276831389ff37e0f3d
  this.edges = []
  this.nodes = []
  this.drawing = div;
  this.graph = null;
  this.tree = null;
  var scale = 5;
  this.canvas = document.createElement('canvas');
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext("2d");
  this.drawing.appendChild(document.createElement('div').appendChild(this.canvas));
  this.polygons = [];
  var polygon = [];

  this.canvas.addEventListener('mousedown', function(evt) {
    var rect = this.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y =  evt.clientY - rect.top;
    var ctx = this.getContext("2d");
    polygon.push({x:x,y:y});
    ctx.beginPath();
    ctx.arc(x,y,scale/2,0,(Math.PI/180)*360,true);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fill();
  },true);

  this.canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(this, evt);
    var message = 'x: '+ mousePos.x + ' y:' + mousePos.y;
    writeMessage(this, message);
  }, false);

  this.draw = function(){
    var hullPoints = convexHull(polygon);
    var from = hullPoints[0];
    from.id=this.nodes.length;
    var n_init = this.nodes.length;
    var poly = {};
    poly.nodes = [];
    poly.edges = [];
    this.ctx.beginPath();
    this.ctx.moveTo(from.x,from.y);
    var nnode = this.nodes.length+1;
    for(var i=1; i<hullPoints.length;i++){
      poly.nodes.push(from);
      this.nodes.push(from);
      this.ctx.lineTo(hullPoints[i].x,hullPoints[i].y);
      var edge ={};
      edge.value = distance(from,hullPoints[i]);
      edge.from = from;
      edge.to = hullPoints[i];
      poly.edges.push(edge);
      this.edges.push(edge);
      from = hullPoints[i];
      from.id = nnode;
      nnode++;
    }
    var edge ={};
    edge.value = distance(from,hullPoints[0]);
    edge.from = from;
    edge.to = {id:n_init,x:hullPoints[0].x,y:hullPoints[0].y};
    poly.edges.push(edge);
    poly.nodes.push(from);
    this.nodes.push(from);
    this.edges.push(edge);
    this.ctx.closePath();
    var color = color_rand();
    this.ctx.fillStyle = color;
    poly.color = color;
    this.ctx.fill();
    this.polygons.push(poly);
    polygon = [];
  }

  this.set_inode = function(){
    if(polygon.length!=1 || this.inode!=-1)
      return;
    polygon[0].id = this.nodes.length;
    this.inode = polygon[0].id;
    this.nodes.push(polygon[0]);
    draw_node(10,polygon[0],'red',this.ctx);
    polygon=[];
  }

  this.set_gnode = function(){
    if(polygon.length!=1 || this.gnode!=-1)
      return;
    var n = 0;
    polygon[0].id = this.nodes.length;
    this.gnode = polygon[0].id;
    this.nodes.push(polygon[0]);
    draw_node(10,polygon[0],'blue',this.ctx);
    polygon=[];
  }

  this.draw_visibles = function(){
    for(var i=0;i<this.nodes.length;i++){
      this.visibles(this.nodes[i].id,this.nodes[i].x,this.nodes[i].y);
    }
  }

  this.vgraph = function(div){
    /***/
    if(this.inode == -1 || this.gnode==-1)
      return;
    var vnodes = [];
    var vedges = [];
    for(var i=0;i<this.nodes.length;i++){
      var  n = {};
      n.id = i;
      n.label = i;
      n.x = this.nodes[i].x;
      n.y = this.nodes[i].y;
      n.color = this.nodes[i].color;
      vnodes.push(n);
    }
    for(var i=0;i<this.edges.length;i++){
      var e = {};
      e.from = this.edges[i].from.id;
      e.to = this.edges[i].to.id;
      e.label = this.edges[i].value;
      vedges.push(e);
    }
    div.style.zIndex = 3;
    this.graph = network(vnodes,vedges,div);
  }

  this.visibles = function(id,x,y){
    for(var i=0; i<this.nodes.length;i++){
      n = this.nodes[i];
      if(x==n.x && y == n.y || same_polygon(id,n.id,this.polygons))
        break;
      var edge = {from:{id:id,x:x,y:y},to:{id:n.id,x:n.x,y:n.y}};
      ni = 0;
      for(var j=0; j<this.polygons.length;j++)
        ni+= instersect(edge,this.polygons[j].edges);
      if(ni==0){
        edge.value = distance(edge.from,edge.to);
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(n.x,n.y);
        this.ctx.lineWidth = 0;
        this.ctx.strokeStyle = "#000";
        this.edges.push(edge);
      }
    }
    this.ctx.stroke();
  }

  this.getGraf = function(){
    return this.graph;
  }

  this.search = function(ei,ef,type,data_div,div){
    if(ei==ef)
      return;
<<<<<<< HEAD
    if(type == 'a*'){
      aux_nodes = this.nodes;
=======
    var aux = null;
    if(type == 'a*')
>>>>>>> 42c309adab2ac9b223d3e2276831389ff37e0f3d
      a(ei,ef,{nodes:this.graph.body.data.nodes,edges:this.graph.body.data.edges},function(sol){
        aux = sol;
        draw_sol(sol,data_div,div);
        for(i in sol.route){
          var ind = parseInt(sol.route[i].split("-")[0]);
          aux_nodes[ind].color = 'red'
        }
      });
<<<<<<< HEAD
      this.canvas.style.opacity = 0.5;
      this.vgraph(this.graph.body.container);
      this.graph.redraw();
=======
      if(type == 'avida')
        avida(ei,ef,{nodes:this.graph.body.data.nodes,edges:this.graph.body.data.edges},function(sol){
          aux = sol;
          draw_sol(sol,data_div,div);
        });
    this.solution = aux;
  }

  this.draw_polygons = function(){
    for(var i=0;i<this.polygons.length;i++){
      var n = this.polygons[i].nodes[0];
      var n0=n;
      var j;
      this.ctx.beginPath();
      this.ctx.moveTo(n.x,n.y);
      for(j=1;j<this.polygons[i].nodes.length;j++){
        this.ctx.lineTo(this.polygons[i].nodes[j].x,this.polygons[i].nodes[j].y);
      }
      this.ctx.closePath();
      var color = color_rand();
      this.ctx.fillStyle = color;
      this.ctx.fill();
>>>>>>> 42c309adab2ac9b223d3e2276831389ff37e0f3d
    }
  }

}

function draw_sol(sol,data_div,div){
  var html = "<p>Busqueda"+sol.algorithm+"<br><br>Ruta solución: <br>";
  for(var i=0;i<sol.route.length;i++){
    for(var j=0;j<sol.tree.nodes.length;j++){
      if(sol.tree.nodes[j].id==sol.route[i]){
        html+=sol.route[i].replace("-","<sub>")+"</sub>"+" -> ";
        sol.tree.nodes[j].color = 'red';
        break;
      }
    }
  }
  html+="<br>Costo de ruta: "+sol.cost+"<br>Pasos realizados: "+sol.np+"<br>"+sol.list+"</p>";
  data_div.innerHTML=html;
  var options = {
      layout:{
        hierarchical: {
          enabled : true
        }
      },
  };
  var n = network(sol.tree.nodes,sol.tree.edges,div,options);
}

function draw_node(r,node,color,ctx){
  ctx.beginPath();
  ctx.arc(node.x,node.y,r,0,(Math.PI/180)*360,true);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0;
  ctx.fillStyle = color;
  ctx.closePath();
  ctx.fill();
}

/****/

function network(nodes,edges,container,options){
  var data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };
  if(options==null){
    options = {
      autoResize:false,
      interaction:{
        dragNodes:false,
        dragView:false,
        hoverConnectedEdges:false,
        zoomView:false,
      },
      physics:{
        enabled:false
      },
      nodes:{
        shape:'circle',
        size:5
      }
    };
  }
  var s = new vis.Network(container, data, options);
  var x = s.body.container.clientWidth/2;
  var y = s.body.container.clientHeight/2;
  s.moveTo({position:{x:x,y:y}});
  return s;
}

/******/
function distance(p1,p2){
  return Math.round(Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2)));
}

function color_rand(){
   var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
   var color = "#";
   for (i=0;i<6;i++){
      posarray = aleatorio(0,hexadecimal.length)
      color += hexadecimal[posarray]
   }
   return color;
}

function aleatorio(inferior,superior){
   numPosibilidades = superior - inferior
   aleat = Math.random() * numPosibilidades
   aleat = Math.floor(aleat)
   return parseInt(inferior) + aleat;
}

function instersect(l1,edges){
  var n_int=0;
  for(var i=0; i<edges.length;i++){
    var l2 = edges[i];
    var p1 = l1.from;
    var p2 = l1.to;
    var p3 = l2.from;
    var p4 = l2.to;
    var lado1 = lado(p1,p2,p3,p4);
    var lado2 = lado(p3,p4,p1,p2);
    if(lado1<0 && lado2<0)
      n_int++;
  }
  return n_int;
}

function lado(p1,p2,p3,p4){
  var dx = p2.x -p1.x;
  var dy = p2.y -p1.y;
  var dx1 = p3.x-p1.x;
  var dy1 = p3.y-p1.y;
  var dx2 = p4.x-p2.x;
  var dy2 = p4.y-p2.y;
  var res = (dx*dy1 - dy*dx1) * (dx*dy2 - dy*dx2);
  return res;
}

function same_polygon(n1,n2,polygons){
  var a = -1;
  var b = -1;
  for(var i=0;i<polygons.length;i++){
    for(var j=0;j<polygons[i].nodes.length;j++){
      if(polygons[i].nodes[j].id == n1)
        a= i;
      if(polygons[i].nodes[j].id == n2)
        b= i;
    }
  }
  if(a!=-1 && a==b)
    return true;
  return false;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, 85,20);
  context.font = '10pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message,5,10);
}
