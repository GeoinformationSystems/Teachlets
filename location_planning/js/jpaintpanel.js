/* This class displays map image and all graphical elements (lines, ...) in a panel */

/*
    public class JPaintPanel extends JPanel
*/

function JPAINPANEL(data) {
    this.data = data;
    this.taInstruc = null;
    this.btnAlgo = null;

	this.myurl = this.getClass().getResource("../Karte_Deutschland.jpg");

	//only try to load image if image path has been found to prevent crash
	if (myurl != null) {
		this.imgMap = Toolkit.getDefaultToolkit().getImage(this.myurl);
		prepareImage(this.imgMap, this); //starts processing of image
	}

	//set font for text panels
	this.setFont(new Font("Arial", Font.BOLD, 11));
}

/* sets width and height of panel */
JPAINPANEL.prototype.setPreferredSize = function(dim){
	this.preferredSize = dim;
}

/* returns width and height of panel */
JPAINPANEL.prototype.getPreferredSize = function () {
	return this.preferredSize;
}

/* paints graphical elements into panel */
JPAINPANEL.prototype.paintComponent = function (g) {
	this.g2 = g;

	//draw panel background
	this.g2.setColor(Color.white);
	this.g2.fillRect(0, 0, this.preferredSize.width, this.preferredSize.height);

	//draw map image
	this.g2.drawImage(this.imgMap, 1, 1, null);

	//draw panel border
	this.g2.setColor(Color.black);
	this.g2.drawRect(0, 0, this.preferredSize.width, this.preferredSize.height);

	//set text and text color of label displaying specific instruction text for algorithm 
	if (_taInstruc != null) {
		if (this.data.getActualPhase() == DataModel.AlgorPhase.SETSTARTNODE)
			this.taInstruc.setForeground(Color.blue);
		else if (this.data.getActualPhase() == DataModel.AlgorPhase.SETENDNODE)
			this.taInstruc.setForeground(Color.red);
		else if (this.data.getActualPhase() == DataModel.AlgorPhase.SHOWRESULT)
			this.taInstruc.setForeground(new Color(0, 180, 0)); //green
		this.taInstruc.setText(this.data.getAlgorithm().getInstructionText(this.data.getActualPhase()));
	}

	//enable/disable "start algorithm" button according to actual phase
	if (this.btnAlgo != null) {
		if (this.data.getActualPhase() == DataModel.AlgorPhase.SETENDNODE) {
			this.btnAlgo.setVisible(true);
			if (this.data.getEndNodes().size() > 0) {
				this.btnAlgo.setEnabled(true);
			} else {
				this.btnAlgo.setEnabled(false);
			}
		}
		else if (this.data.getActualPhase() == DataModel.AlgorPhase.SHOWRESULT) {
			this.btnAlgo.setEnabled(true);
		}
	}

	//draw edges and distance if necessary
	if (this.data.getAlgorithm() != null) {
		drawEdges(this.g2);
	}
	//draw nodes
	drawNodes(this.g2);
}

/* draw general nodes for all algorithm and specific nodes per algorithm */
JPAINPANEL.prototype.drawNodes = function (g2) {
	this.n = null;
	this.clrInside = null;
	this.clrOutside = Color.white;
	this.drawBig = false;

	//draw general nodes valid for all algorithms
	this.nIter = this.data.nodeIterator();
	while (nIter.hasNext()) {
		this.n = this.nIter.next();

		//set color and size of node according to algorithm, phase and type of node
		if (this.data.getAlgorithm() != null) {
			if (this.data.getStartNodes().get_nodelist().contains(n)) { //node = start node
				this.clrInside = Color.blue;
			} else { //node = normal
				this.clrInside = Color.black;
			}
			this.drawBig = false;

			if (this.data.getStartNodes().get_nodelist().contains(n)) //node = start node
			{
				this.clrInside = Color.blue;
				this.drawBig = true;
			}
			else if (this.data.getEndNodes().get_nodelist().contains(n)) //node = end node
			{
				this.clrInside = Color.red;
				this.drawBig = true;
			}
			else if (this.n.getID() == _mouseovernodeID) //mouse cursor touches node
			{
				this.clrInside = Color.black;
				this.drawBig = false;

				if (this.data.getActualPhase() == DataModel.AlgorPhase.SETSTARTNODE) { //start node has to be chosen
					this.clrInside = Color.blue;
					this.drawBig = true;
				} else if (_data.getActualPhase() == DataModel.AlgorPhase.SETENDNODE) { //end node has to be chosen
					this.clrInside = Color.red;
					this.drawBig = true;
				}
			}
			else //normal node (not start or end node)
			{
				this.clrInside = Color.black;
				this.drawBig = false;
			}
		}
		else //normal node
		{
			this.clrInside = Color.black;
			this.drawBig = false;
		}

		//draw small or big variant of node 
		this.g2.setColor(this.clrInside);
		if (this.drawBig)
			this.g2.fillPolygon(this.n.getBigPolygon());
		else
			this.g2.fillPolygon(this.n.getPolygon());
		this.g2.setColor(this.clrOutside);
		this.g2.setStroke(THINLINE);
		if (this.drawBig)
			this.g2.drawPolygon(this.n.getBigPolygon());
		else
			this.g2.drawPolygon(this.n.getPolygon());

		//label node
		this.g2.setColor(new Color(255, 255, 100));
		this.g2.drawString(this.n.getName(), this.n.getX() + this.data.getDiameter() - (this.n.getName().length() * 3), this.n.getY() - (this.data.getDiameter() / 2));
	}

	//draw specific nodes and result nodes of algorithm if available
	if (this.data.getAlgorithm() != null) {
		this.nIter = this.data.getNodeListAlgo().iterator();
		while (this.nIter.hasNext()) {
			this.n = this.nIter.next();
			if (this.data.getStartNodes().get_nodelist().contains(n)) {
				this.clrInside = Color.blue;
			} else if (this.data.getEndNodes().get_nodelist().contains(n)) {
				this.clrInside = Color.red;
			} else {
				this.clrInside = Color.black;
			}

			//draw big variant of node 
			this.g2.setStroke(THINLINE);
			this.g2.setColor(this.clrInside);
			this.g2.fillPolygon(this.n.getBigPolygon());
			this.g2.setColor(this.clrOutside);
			this.g2.drawPolygon(this.n.getBigPolygon());

			//label node
			this.g2.setColor(Color.white);
			if (this.n.getID() < 10)
				this.g2.drawString(Integer.toString(this.n.getID()), this.n.getX() + this.data.getDiameter() / 2 - 2, this.n.getY() + this.data.getDiameter() / 2 + 4);
			else
				this.g2.drawString(Integer.toString(this.n.getID()), this.n.getX() + this.data.getDiameter() / 2 - 5, this.n.getY() + this.data.getDiameter() / 2 + 4);
		}

		//draw result nodes for algorithm (only in case of location-allocation-problem)
		this.nIter = this.data.getNodeResultList().iterator();
		this.i = 0;
		while (this.nIter.hasNext()) {
			this.n = this.nIter.next();
			this.dia = this.n.getDiameter();
			if (this.i == 0) { //optimal location
				this.g2.setStroke(THINLINE);
				this.g2.setColor(this.cResult);
				this.g2.fillOval((this.n.getX() - this.dia / 2), (this.n.getY() - this.dia / 2), this.dia, this.dia);
				this.g2.setColor(Color.black);
				this.g2.drawOval((this.n.getX() - this.dia / 2), (this.n.getY() - this.dia / 2), this.dia, this.dia);
				this.g2.setColor(this.cResult);
				this.g2.drawString(this.n.getName(), this.n.getX() + this.data.getDiameter() - (this.n.getName().length() * 3), this.n.getY() - (this.data.getDiameter() / 2) - 5);
			} else if (this.i == 1) { //smallest bounding circle
				this.g2.setColor(Color.white);
				this.g2.drawOval((this.n.getX() - this.dia / 2), (this.n.getY() - this.dia / 2), this.dia, this.dia);
			}
			this.i++;
		}
	}
}

/* drae edges */
JPAINPANEL.prototype.drawEdges = function (g2) {
	this.e = null;
	this.x1, this.x2, this.y1, this.y2;
	this.iter = null;
	this.isResultEdge = false;

	this.iter = this.data.edgeIterator();

	//draw weight depending on if edge is normal or result edge
	while (this.iter.hasNext()) {
		this.e = this.iter.next();
		this.x1 = this.e.getStartNode().getX() + this.data.getDiameter() / 2;
		this.y1 = this.e.getStartNode().getY() + this.data.getDiameter() / 2;
		this.x2 = this.e.getEndNode().getX() + this.data.getDiameter() / 2;
		this.y2 = this.e.getEndNode().getY() + this.data.getDiameter() / 2;

		if (this.data.getEdgeResultList().contains(e) || this.data.getEdgeResultList().contains(this.e.getReverse()))
			this.isResultEdge = true;
		else
			this.isResultEdge = false;
		this.dist = 0;
		this.dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
		this.dist = Math.round(this.dist);

		//draw rect
		this.g2.setStroke(THINLINE);
		if (this.isResultEdge) {
			this.g2.setColor(Color.black);
		} else {
			this.g2.setColor(Color.white);
		}
		if (this.e.getWeight() < 10)
			this.g2.fillRect(x1 + (x2 - x1) / 2 - 5, y1 + (y2 - y1) / 2 - 6, 10, 12);
		else if (this.e.getWeight() <= 99)
			this.g2.fillRect(x1 + (x2 - x1) / 2 - 10, y1 + (y2 - y1) / 2 - 6, 18, 12);
		else
			this.g2.fillRect(x1 + (x2 - x1) / 2 - 15, y1 + (y2 - y1) / 2 - 6, 26, 12);

		//draw outline of rect
		if (this.isResultEdge) {
			this.g2.setColor(cResult);
		} else {
			this.g2.setColor(Color.black);
		}
		if (this.e.getWeight() < 10)
			this.g2.drawRect(x1 + (x2 - x1) / 2 - 5, y1 + (y2 - y1) / 2 - 6, 10, 12);
		else if (this.e.getWeight() <= 99)
			this.g2.drawRect(x1 + (x2 - x1) / 2 - 10, y1 + (y2 - y1) / 2 - 6, 18, 12);
		else
			this.g2.drawRect(x1 + (x2 - x1) / 2 - 15, y1 + (y2 - y1) / 2 - 6, 26, 12);

		//draw weight string
		if (this.isResultEdge) {
			this.g2.setColor(Color.white);
		} else {
			this.g2.setColor(Color.black);
		}
		if (this.e.getWeight() < 10)
			this.g2.drawString(String.valueOf(this.e.getWeight()), x1 + (x2 - x1) / 2 - 2, y1 + (y2 - y1) / 2 + 5);
		else if (this.e.getWeight() <= 99)
			this.g2.drawString(String.valueOf(this.e.getWeight()), x1 + (x2 - x1) / 2 - 7, y1 + (y2 - y1) / 2 + 5);
		else
			this.g2.drawString(String.valueOf(this.e.getWeight()), x1 + (x2 - x1) / 2 - 12, y1 + (y2 - y1) / 2 + 5);
	}
}

/* set id of node mouse cursor is over at the moment */
JPAINPANEL.prototype.setMouseoverNode = function (id) {
	this.mouseovernodeID = id;	
}

/* set text area object depending on actual algorithm */
JPAINPANEL.prototype.setActualInstructionTextArea = function (ta) {
	this.taInstruc = ta; 
}

/* set button object depending on actual algorithm */
JPAINPANEL.prototype.setActualContinueButton = function (button) {
	this.btnAlgo = button; 
}