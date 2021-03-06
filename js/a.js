var type="a*";
var h;

function avida(ei,ef,data,callback){
  type = "avida";
  a(ei,ef,data,callback);
}

function a(ei,ef,data,callback){
  h = heuristic(ef,data);
  var html_list = '<hr>Lista de nodos<br><br>';
  var cont = 0;
  var nodes = [];
  var edges = [];
  var list = [];
  var np=0;
  var n = {id:ei.toString()+"-"+h[ei]+"-"+ei,node:ei,val:h[ei],label:ei,level:0};
  while(n.node!=ef){
    var neighbors = get_neighbors(n,data.edges._data);
    if(neighbors.length !=0){
      for (var i=0;i<neighbors.length;i++){
        var nb = neighbors[i].node;
        if(!is_in(nb,nodes)){
          var v = h[n.node];
          if(type=='a*')
            v += neighbors[i].val-h[n.node];
          list.push({id:nb.toString()+"-"+v+"-"+n.node,node:nb,val:v,label:nb,level:n.level+1});
          var e = {from:n.id.toString()};
          e.to = nb.toString()+"-"+v+"-"+n.node;
          if(type=='a*')
            e.label = neighbors[i].val-n.val;
          else {
            e.label = neighbors[i].val;
          }
          edges.push(e);
        }
      }
    }
    nodes.push(n);
    list.sort(compare);
    cont++;
    html_list += "interaction: "+cont+"<br>";
    for(var i=list.length-1;i>=0;i--)
      html_list+=list[i].id.replace("-","<sub>")+"</sub>"+" -> ";
    html_list+='<br>';
    np++;
    n = list.shift();
    if(n==null)
      break;
  }
  nodes.push(n);
  var route=[];
  var cost = 0;
  var nn = nodes[nodes.length-1].id;
  while(nn!=nodes[0].id){
    for(var i=0;i<edges.length;i++){
      if(edges[i].to == nn){
        route.push(nn);
        cost+= parseInt(edges[i].label);
        nn=edges[i].from;
      }
    }
  }
  route.push(nn);
  var sol = {route:route,cost:cost,list:html_list,np:np,tree:{nodes:nodes,edges:edges},algorithm:type};
  callback(sol);
  type = "a*";
}

/***functions***/


function heuristic(ef,data){//Returns the heuristic table
  var ht = [];
  var nodes = data.nodes._data;
  for (var i in nodes){
    var hn = distance({x:data.nodes._data[ef].x,y:data.nodes._data[ef].y},{x:nodes[i].x,y:nodes[i].y});
    ht.push(hn);
  }
  return ht;
}

function get_neighbors(n,edges){
  var nb = [];
  for (var i in edges){
    var g = 0;
    if(type == 'a*')
      g=n.val;
    var nn = {val:g+parseInt(edges[i].label)};
    if(edges[i].from == n.node){
      nn.label = edges[i].to;
      nn.node = edges[i].to;
      nn.id = edges[i].to.toString()+"-"+nn.val.toString()+"-"+n.node;
      nb.push(nn);
    }
    if(edges[i].to == n.node){
      nn.label = edges[i].from;
      nn.node = edges[i].from;
      nn.id = edges[i].from.toString()+"-"+nn.val.toString()+"-"+n.node;
      nb.push(nn);
    }
  }
  return nb;
}

function compare(a,b) {
  if (a.val < b.val)
    return -1;
  if (a.val > b.val)
    return 1;
  return 0;
}

function distance(p1,p2){
  return Math.round(Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2)));
}

function is_in(x,l){
  for(var i=0;i<l.length;i++){
    if(l[i].node==x)
      return true;
  }
  return false;
}
