/* This class models the Location-Allocation-Problem */

function ALGORLOCATALLOCAT() {
    this.nodeList = new NODELIST();
    this.edgeList = new Vector();
    this.MAXSTARTNODES = 0; 
	this.MAXENDNODES = 30;
	this.nodeList;
	this.edgeList;
}

/* returns maximal allowed number of end nodes */
ALGORLOCATALLOCAT.prototype.getMaxEndNodes = function () {
	return this.MAXENDNODES;
}

/* returns maximal allowed number of start nodes */
ALGORLOCATALLOCAT.prototype.getMaxStartNodes = function () {
	return this.MAXSTARTNODES;
}

/* add new edge to specific edge list of this algorithm */
ALGORLOCATALLOCAT.prototype.addEdge = function (e) {
	this.edgeList.add(e);
}

/* returns specific edge list of this algorithm */
ALGORLOCATALLOCAT.prototype.getEdges = function () {
	return this.edgeList;
}

/* add new node to specific node list of this algorithm */
ALGORLOCATALLOCAT.prototype.addNode = function (n) {
	this.nodeList.add(n);
}

/* return specific node list of this algorithm */
ALGORLOCATALLOCAT.prototype.getNodeList = function () {
	return this.nodeList;
}

/* calculates algorithm to solve problem and returns solution */
ALGORLOCATALLOCAT.prototype.calculateAlgo = function (data) {
	this.v = new Array;
	this.bndry = new MYPOINT[3];
	this.p = new MYPOINT[this.nodeList.size()];
	this.minCenter = new MYPOINT(0, 0);
	this.minRadius;

	//save coordinates of all nodes in point array
	for (i = 0; i < this.nodeList.size(); i++) {
		this.dia = this.nodeList.get(i).getDiameter();
		this.p[i] = new MYPOINT(this.nodeList.get(i).getX() + this.dia / 2, this.nodeList.get(i).getY() + this.dia / 2);
	}

	//execute algorithm
	this.minC = BOUNDINGCIRCLE.minCircle(this.nodeList.size(), this.p, 0, this.bndry);
	this.minCenter = this.minC.getMiddlePoint();
	this.minRadius = this.minC.getRadius();
	this.x = this.minCenter.getX();
	this.y = this.minCenter.getY();

	//save found optimal location as node into Vector	
	this.nOpt = new Node(this.x, this.y, this.data.getDiameter(), "optimaler Standort");
	this.v.add(this.nOpt);
	//save found smallest bounding circle as node into Vector
	this.n2 = new Node((this.x, this.y, this.minRadius * 2, "Kreis"));
	this.v.add(this.n2);

	return this.v;
}