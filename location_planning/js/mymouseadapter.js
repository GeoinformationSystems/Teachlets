/* This class handles mouse events */

/*
    public class MyMouseAdapter extends MouseInputAdapter
*/

function MYMOUSEADAPTER(v, data) {
    this.viewer = v;
    this.data = data;
}

/* overwrites mousePressed method
    according to actual algorithm select given node or set own node into map */
MYMOUSEADAPTER.prototype.mousePressed = function (e) {
	this.n = null;

	if (this.data.getAlgorithm() == null)
		return;

	//set own start nodes
	if (this.data.getActualPhase() == this.DataModel.AlgorPhase.SETSTARTNODE) {
		this.n = new Node(e.getX() - this.data.getDiameter() / 2, e.getY() - this.data.getDiameter() / 2,
			this.data.getDiameter(), "1");
		this.data.addNodeAlgo(this.n);
		this.data.addStartNode(this.n);
	} else { //set own end nodes
		this.id = 0;
		if (this.data.getAlgorithm().getNodeList().size() > 0)
			this.id = this.data.getAlgorithm().getNodeList().last().getID() + 1;
		else
			this.id = 1;
		this.n = new Node(e.getX() - this.data.getDiameter() / 2, e.getY() - this.data.getDiameter() / 2,
			this.data.getDiameter(), Integer.toString(this.id));
		this.data.addNodeAlgo(n);
		this.data.addEndNode(n);
	}
	this.viewer.repaint();
}
