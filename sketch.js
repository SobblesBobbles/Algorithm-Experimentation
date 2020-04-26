
var cols = 100;
var rows = 100;
var fullSet = [];

var openSet = [];// openset => current  nodes
var closedSet = []; // closed set = > already evaluated
var start, end;
var width, length;
  var testBLocks = 0;
var path =[];
var drawingOption = true;

var IsSolution = true;

var CURRENT ;
function RemoveFromArray (arr, elt){
  for (var i = arr.length-1 ; i>=0; i--){
    if(arr[i]==elt){
      arr.splice(i,1);
    }
  }
}


function Heuristic (a, b){
  var heur = dist(a.i, a.j, b.i, b.j);
//var heur = abs(a.i-b.i)+ abs(a.j-b.j);
  return heur;
}

function Node (i,j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.h = 0;
  this.g = 0;
  this.previous = undefined;
  this.neighbours = [];
  this.wall = false;
  this.clicked = function (){
    let d = dist(mouseX, mouseY, this.i, this.j);
    if(d<(this.i*width)){
      console.log("inside");
    }
  }
  if(random(10)<1){
    this.wall = true;
  }
  this.show = function (colour) {
    fill(colour);
    if(this.wall){
      fill(0);
    }
    noStroke();


    ellipse(this.i*width, this.j*height, width-1, height-1);
  }
  this.addNeighbours = function (grid) {
    if(i<cols-1) {this.neighbours.push(grid[i+1][j]);}
    if(i>0) {this.neighbours.push(grid[i-1][j]);}
    if(j<rows-1) {this.neighbours.push(grid[i][j+1]);}
    if(j>0) {this.neighbours.push(grid[i][j-1]);}
  }
}





var grid = new Array(cols);

function CreateGrid () {
  createCanvas(400,400);
  console.log("created Setup");
  width = width/cols;
  height = height/rows;
}


function CreateNodes () {
  // 2d array
   for (var i = 0; i<cols; i++){
     grid[i] = new Array(rows);
   }
   for(var  i = 0; i<cols; i++){
     for (var j = 0; j<rows; j++){
       grid[i][j] = new Node(i,j);
        // grid[i][j].addNeighbours(grid);
     }
   }
   start = grid[0][0];
   //end = grid[70][99];
   var randomX = random(48);
   var randomY = random(48);
      end = grid[48][40];
}


function setup(){
    CreateGrid();
    CreateNodes();

    for(var  i = 0; i<cols; i++){
      for (var j = 0; j<rows; j++){
         grid[i][j].addNeighbours(grid);
      }
    }
    var tempObj = {
      open:true,
      grid : start
    };

      openSet.push(start);
}



function draw ()
{


// While loop
  if (openSet.length>0){


      var lowestIndex = 0;
        // find the index of the closest node in the Open Set
      for(var i = 0; i<openSet.length; i++){
          if(openSet[i].f<openSet[lowestIndex].f){
            lowestIndex = i;
          }
      }

       var Current = openSet[lowestIndex];
       if(Current===end){
           openSet = [];
           noLoop();
         console.log("Finished");
       }
       else {

         var neighbours = Current.neighbours;
         var neighbour;
         var tempG;
         for (var i = 0; i<neighbours.length; i++){
            neighbor = neighbours[i];

           if(!closedSet.includes(neighbor)&& !neighbor.wall){
                tempG= Current.g +1;
               if(openSet.includes(neighbor)){
                 if(tempG <neighbor.g){
                   neighbor.g = tempG;
                 }
               }
               else {
                 neighbor.g = tempG;
                 openSet.push(neighbor);
               }
               var HueristicVal = Heuristic(neighbor,end);
               neighbor.h = HueristicVal;
               neighbor.f = neighbor.g +(neighbor.h*1.5);
               neighbor.previous = Current;
             }
         }
         RemoveFromArray(openSet,Current);
         closedSet.push(Current);
       }
      if(end.wall){
        openSet = [];
      }
   }
   else {
     IsSolution = false;
   }


  background(0);

  for(var i = 0; i<cols; i++){
    for(var j = 0; j<rows; j++){
      grid[i][j].show(color(255));
    }
  }

  //
  for(var i = 0; i<openSet.length; i++ ){
    openSet[i].show(color(0,255,0));
  }

  for(var i = 0; i<closedSet.length; i++ ){
    closedSet[i].show(color(255,0,0));
  }




  // Find the path
if(IsSolution){
  path = [];
  var temp = Current;
  path.push(temp);

  while(temp.previous!=null){
      path.push(temp.previous);
      temp = temp.previous;
  }
}
else if(!IsSolution){
  noLoop();
}


  for(var i = 0; i<path.length; i++ ){
    path[i].show(color(0,0,255));
  }


}
