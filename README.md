# Algorithm-Experimentation

## Dijkstra algorithm
Messed around with Dijkstra's algorithm for pathfinding A to B.  I found it was fine when the grid was small in size (less than 100 size grid). When specifying the grid to be over 1000 nodes, the algorithm significantly slowed down as it had to check all paths that were still valid. (Not a lot of obstacles in the way)

## A* Search 
Messed around with the A* Search which is a more efficient finding version of Dijkstra because the distance from the current node to the end is used as a deciding variable. Travelling from A to B with C being the current node, the distance from C to B is used to determine how important the current path is. 

## A* Search Example

![](https://github.com/SobblesBobbles/Algorithm-Experimentation/blob/master/Unedited_Search.gif)


## Modifying the efficiency
I found that the complexity was better than Dijkstra but it still created timing issues over larger grid sets (over 200). So I thought about what A* was trying to achieve. 
A* was using distance as a variable when computing the list of suitable paths. So I concentrated on that, A to B with C being the current Node inbetween A and B, I used X as the distance between C and B and multiplied its importance in determining the X value. 

This actually created a much faster result although further testing remains to see if it works is always 100% correct. 

## Modified Result 
![](https://github.com/SobblesBobbles/Algorithm-Experimentation/blob/master/Edited_Search.gif)
