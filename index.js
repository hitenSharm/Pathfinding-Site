// Queue class 
class Queue 
{ 
	// Array is used to implement a Queue 
	constructor() 
	{ 
		this.items = []; 
	} 
				
	// Functions to be implemented 
	// enqueue function 
    enqueue(element) 
    {	 
        // adding element to the queue 
        this.items.push(element); 
    } 

	// dequeue function 
    dequeue() 
    { 
        // removing element from the queue 
        // returns underflow when called 
        // on empty queue 
        if(this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift(); 
    } 
 
	// front function 
    front() 
    { 
        // returns the Front element of 
        // the queue without removing it. 
        if(this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    } 
 
	// isEmpty function 
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    } 

	// printQueue function 
    printQueue() 
    { 
        var str = ""; 
        for(var i = 0; i < this.items.length; i++) 
            str += this.items[i] +" "; 
        return str; 
    } 
 
} 

// Stack class 
class Stack { 

	// Array is used to implement stack 
	constructor() 
	{ 
		this.items = []; 
	} 

	// Functions to be implemented 
	// push function 
    push(element) 
    { 
        this.items.push(element); 
    } 
 
	// pop function 
    pop() 
    { 
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 
 
	// peek function 
    peek() 
    { 
        
        return this.items[this.items.length - 1]; 
    } 
 
	// isEmpty function 
    isEmpty() 
    {
        return this.items.length == 0; 
    }  
} 


function clicker(index){
    var itemsperrow = 10;
    var row = Math.ceil(index / itemsperrow );
    var column=index%10;
    if(column==0)
    column=10;
    //console.log(row,column);
    var tempNode=document.querySelector(`div[row="${row}"][col="${column}"]`);
     
    var x=tempNode.getAttribute("visited");

    if(index==1||index==100)
    {
        console.log("NO");
    }else{
        if(x==0)
        {
            tempNode.setAttribute("visited",1);
            tempNode.style.backgroundColor="black";
        }else
        {
            tempNode.setAttribute("visited",0);
            tempNode.style.backgroundColor="#00ffcc";
        }
    }
    
       
    
    // console.log(tempNode);
 
}

function createNode(row,col,index){
    var node = document.createElement("div");
    node.setAttribute("class", "node");
    node.setAttribute("row", row);
    node.setAttribute("col", col);
    node.setAttribute("index", index);
    node.setAttribute("visited",0);
    node.setAttribute("onclick", "clicker("+ index +")");
    return node;
}

function createBoard(){
    var nodeGrid=document.getElementById("grid");
    index=1;
    for(var row = 1; row <=10; row++){
        for (var col = 1; col <=10; col++){
            let temp=createNode(row,col,index);            
            nodeGrid.appendChild(temp);
            index++;
        }
    }
    var startNode = document.querySelector("div[row='1'][col='1']");
    var endNode = document.querySelector("div[row='10'][col='10']");
    startNode.style.backgroundColor="blue";
    endNode.style.backgroundColor="red";
    
  
}

function changeStyles(pathNodes,flag)
{
  var x=0;
  var colour="#33cc33";
  if(flag==1)
  {
    colour="#ffff66";
  }
  for(let i=pathNodes.length-1; i>=0; i--)
  {
    setTimeout(()=>{
      const stylingNode=pathNodes[i];      
      stylingNode.style.backgroundColor=colour;
    },50*x);
    x++;
  }
  return ;
}

function sendPath(map,num){
    var pathNodes=[];
    var index=99;
    while(index!=0){       
        var temp=map.get(index);
        var thisIndex=index+1;
        var rowofNode = Math.ceil(thisIndex / 10 );
        var colOfNode=thisIndex%10;
        if(colOfNode==0)
        colOfNode=10;

        var currNodeIs=document.querySelector(`div[row="${rowofNode}"][col="${colOfNode}"]`);
        
        if(index!=99)
        {
          pathNodes.push(currNodeIs);
        }
        index=temp;
    }
changeStyles(pathNodes,num);
console.log("Path!");
}

function BFS(){
    //insert dijkastra code
    var startNode = document.querySelector("div[row='1'][col='1']");
    var endNode = document.querySelector("div[row='10'][col='10']");
    var adj = new Array(100);

    for (var i = 0; i < adj.length; i++) {
        adj[i] = new Array(100);
    }

    for(var i=0;i<100;i++)
    {
        for(var j=0;j<100;j++)
        adj[i][j]=0;
    }

    for(var i=1;i<=10;i++)
    {
        for(var j=1;j<=10;j++)
        {
            var lnode=-1;
            var rnode=-1;
            var unode=-1;
            var dnode=-1;
            var currnode=document.querySelector(`div[row="${i}"][col="${j}"]`)
            var currVal=currnode.getAttribute("index");
            if(j-1>=1)
            {
                lnode=document.querySelector(`div[row="${i}"][col="${j-1}"]`);
            }
            if(j+1<=10)
            {
                rnode=document.querySelector(`div[row="${i}"][col="${j+1}"]`);
            }
            if(i-1>=1)
            {
                unode=document.querySelector(`div[row="${i-1}"][col="${j}"]`);
            }
            if(i+1<=10)
            {
                dnode=document.querySelector(`div[row="${i+1}"][col="${j}"]`);
            }
            if(lnode!=-1)
            {
                var nodeIndex=lnode.getAttribute("index");
                var temp=lnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                }                
            }
            if(rnode!=-1)
            {
                var nodeIndex=rnode.getAttribute("index");
                var temp=rnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
            if(unode!=-1)
            {
                var nodeIndex=unode.getAttribute("index");
                var temp=unode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
            if(dnode!=-1)
            {
                var nodeIndex=dnode.getAttribute("index");
                var temp=dnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
        }
    }
   //console.log(adj);
    var queue = new Queue();
   

    var vis=new Array(100);
    for (var i = 0; i < vis.length; i++) {
        vis[i] = 0;
    }
   var map1=new Map([]);

    var indi=0;
    vis[0]=1;
    queue.enqueue(indi);
    var fl=0;
    while(!queue.isEmpty())
    {
        if(fl==1)break;
        indi=queue.front();
        queue.dequeue();
        for(var j=0;j<100;j++){
            if(adj[indi][j]==1 && vis[j]==0)
            {
                vis[j]=1; 
                map1.set(j,indi);
                queue.enqueue(j);                               
                if(j==99)
                {
                    //console.log(vis);
                    fl=1;
                    break;
                }
            }
        }
    }
   //finding path no diagonals
   if(fl==1)
   {
       sendPath(map1,2);
   }else
   {
    alert("BRUH No path sorry m8");
   }
}

function DFS(){
    //insert dfs code.
    var adj = new Array(100);

    for (var i = 0; i < adj.length; i++) {
        adj[i] = new Array(100);
    }

    for(var i=0;i<100;i++)
    {
        for(var j=0;j<100;j++)
        adj[i][j]=0;
    }

    for(var i=1;i<=10;i++)
    {
        for(var j=1;j<=10;j++)
        {
            var lnode=-1;
            var rnode=-1;
            var unode=-1;
            var dnode=-1;
            var currnode=document.querySelector(`div[row="${i}"][col="${j}"]`)
            var currVal=currnode.getAttribute("index");
            if(j-1>=1)
            {
                lnode=document.querySelector(`div[row="${i}"][col="${j-1}"]`);
            }
            if(j+1<=10)
            {
                rnode=document.querySelector(`div[row="${i}"][col="${j+1}"]`);
            }
            if(i-1>=1)
            {
                unode=document.querySelector(`div[row="${i-1}"][col="${j}"]`);
            }
            if(i+1<=10)
            {
                dnode=document.querySelector(`div[row="${i+1}"][col="${j}"]`);
            }
            if(lnode!=-1)
            {
                var nodeIndex=lnode.getAttribute("index");
                var temp=lnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                }                
            }
            if(rnode!=-1)
            {
                var nodeIndex=rnode.getAttribute("index");
                var temp=rnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
            if(unode!=-1)
            {
                var nodeIndex=unode.getAttribute("index");
                var temp=unode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
            if(dnode!=-1)
            {
                var nodeIndex=dnode.getAttribute("index");
                var temp=dnode.getAttribute("visited");
                if(temp==0){                    
                    adj[currVal-1][nodeIndex-1]=1;
                }else{
                    adj[currVal-1][nodeIndex-1]=0;
                } 
            }
        }
    }
    var stack = new Stack();
   

    var vis=new Array(100);
    for (var i = 0; i < vis.length; i++) {
        vis[i] = 0;
    }
   var map1=new Map([]);

    var indi=0;
    vis[0]=1;
    stack.push(indi);
    var fl=0;
    while(!stack.isEmpty())
    {
        if(fl==1)break;
        indi=stack.peek();
        stack.pop();
        for(var j=0;j<100;j++){
            if(adj[indi][j]==1 && vis[j]==0)
            {
                vis[j]=1; 
                map1.set(j,indi);
                stack.push(j);                               
                if(j==99)
                {
                    //console.log(vis);
                    fl=1;
                    break;
                }
            }
        }
    }
   //finding path no diagonals
   if(fl==1)
   {
    console.log("dfs")
       sendPath(map1,1);
   }else
   {
    alert("BRUH No path sorry m8");
   }
    // 
}

window.onload = () => {
    createBoard();
  };

