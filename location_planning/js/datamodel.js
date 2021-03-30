/* This class contains data and algorithm handling */

function DATAMODEL(d) {
	this.diameter = d;
	this.nodeListAll = new NODELIST();
	this.startNodes = new NODELIST();
	this.endNodes = new NODELIST();
	this.edgeResultList = new Vector();
	this.nodeResultList = new Vector();
	setAlgorithm(new AlgorLocatAllocat());
}

/* return diameter of nodes */
DATAMODEL.prototype.getDiameter = function () {
	return this.diameter;
}

/* set diameter of nodes */
DATAMODEL.prototype.setDiameter = function (d) {
	this.diameter = d;
}

/* save node general node list */
DATAMODEL.prototype.add = function (n) {
	this.nodeListAll.add(n);
}

/* save node in list for specific algorithm */
DATAMODEL.prototype.addNodeAlgo = function (n) {
	if (getActualPhase() == AlgorPhase.SETSTARTNODE ||
		getActualPhase() == AlgorPhase.SETENDNODE) {
		if (getAlgorithm() != null)
			getAlgorithm().addNode(n);
		else
			System.out.println("There is not set an algorithm!");
	}
}

/* return general node list */
DATAMODEL.prototype.getNodeListAll = function () {
	return this.nodeListAll;
}

/* return list containing specific nodes for an algorithm */
DATAMODEL.prototype.getNodeListAlgo = function () {
	return this.algorithm.getNodeList();
}

/* returns iterator for general node list */
DATAMODEL.prototype.nodeIterator = function () {
	return this.nodeListAll.iterator();	
}

/* clear general node list, start node list and end node list  */
DATAMODEL.prototype.clearNodeListAll = function () {
	this.nodeListAll.clear();
	this.startNodes.clear();
	this.endNodes.clear();
}

/* clear start node list and end node list */
DATAMODEL.prototype.clearNodeListStartEnd = function () {
	this.startNodes.clear();
	this.endNodes.clear();
}

/* save edge in list */
DATAMODEL.prototype.add = function (e) {
	if (this.algorithm != null)
		this.algorithm.addEdge(e);
	else
		System.out.println("There is set no algorithm!");
}

/* return specific edge list of algorithm */
DATAMODEL.prototype.getEdgeList = function () {
	return this.algorithm.getEdges();
}

/* return specific edge list of algorithm */
DATAMODEL.prototype.edgeIterator = function () {
	return this.algorithm.getEdges().iterator();
}

/* clear specific edge list of algorithm */
DATAMODEL.prototype.removeEdges = function () {
	this.algorithm.getEdges().clear();
}

/* add start nodes to start node list */
DATAMODEL.prototype.addStartNode = function (n) {
	if (getActualPhase() == AlgorPhase.SETSTARTNODE) {
		this.startNodes.add(n);
		//if maximum number of allowed start nodes has been reached change phase
		if (this.startNodes.size() == this.algorithm.getMaxStartNodes())
			if (this.algorithm.getMaxEndNodes() == 0)
				setActualPhase(AlgorPhase.SHOWRESULT);
			else
				setActualPhase(AlgorPhase.SETENDNODE);
	}
}

/* return start node list */
DATAMODEL.prototype.getStartNodes = function () {
	return this.startNodes;
}

/* add end nodes to end node list */
DATAMODEL.prototype.addEndNode = function (n) {
	if (getActualPhase() == AlgorPhase.SETENDNODE) {
		this.endNodes.add(n);
		//if maximum number of allowed end nodes has been reached change phase
		if (this.endNodes.size() == this.algorithm.getMaxEndNodes())
			setActualPhase(AlgorPhase.SHOWRESULT);
	}
}

/* return end node list */
DATAMODEL.prototype.getEndNodes = function () {
	return this.endNodes;
}

/* set edge list containing result edges after computing algorithm */
DATAMODEL.prototype.setEdgeResultList = function (resultList) {
	this.edgeResultList = resultList;
}

/* set node list containing result nodes after computing algorithm */
DATAMODEL.prototype.setNodeResultList = function (resultList) {
	this.nodeResultList = resultList;
}

/* return edge list containing result edges after computing algorithm */
DATAMODEL.prototype.getEdgeResultList = function () {
	return this.edgeResultList;
}

/* return node list containing result nodes after computing algorithm */
DATAMODEL.prototype.getNodeResultList = function () {
	return this.nodeResultList;
}

/* clear edge and node result lists */
DATAMODEL.prototype.clearResultLists = function () {
	this.edgeResultList.clear();
	this.nodeResultList.clear();
}

/* return actual phase of algorithm */
DATAMODEL.prototype.getActualPhase = function () {
	return this.actualphase;
}

/* set actual phase of algorithm */
DATAMODEL.prototype.setActualPhase = function () {
	this.actualphase = phase;
}

/* set algorithm */
DATAMODEL.prototype.setAlgorithm = function (_algoLocat) {
	this.algorithm = _algoLocat;
}

/* return algorithm */
DATAMODEL.prototype.getAlgorithm = function () {
	return this.algorithm;
}