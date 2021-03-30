/* This class manages all nodes in a Vector */
function NODELIST (){
    this.nodes = new Array();
    this.iCntNodeID = 1;
}

/* saves a node in list */
NODELIST.prototype.add = function (n) {
	if (this.nodes.add(n)) {
		if (n.getID() <= 0)
			n.setID(this.iCntNodeID++);
		return true;
	}
	return false;
}

/* return all nodes of vector */
NODELIST.prototype.getNodelist = function () {
	return this.nodes;
}

/* remove all nodes */
NODELIST.prototype.clear = function () {
	this.nodes.clear();
	this.iCntNodeID = 1;
}

/* get node at specific position in Vector */
NODELIST.prototype.get = function (arg) {
	return this.nodes.get(arg);
}

/* return first node in list */
NODELIST.prototype.first = function () {
	return this.nodes.get(0);
}

/* return returns node iterator of list */
NODELIST.prototype.iterator = function () {
	return this.nodes.iterator();
}

/* return last node in list */
NODELIST.prototype.last = function () {
	return this.nodes.get(this.nodes.size() - 1);
}

/* return amount of all saved nodes */
NODELIST.prototype.size = function () {
	return this.nodes.size();
}

/* check if Vector contains specific node */
NODELIST.prototype.contains = function (n) {
	return this.nodes.contains(n);
}