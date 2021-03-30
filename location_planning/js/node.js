/* This class models a node consisting of id, coordinates x/y, diameter and name */

function NODE(x,y,name,d) {
    this.ID = 0;
    this.x = x;
    this.y = y;
    this.name = name;
    this.diameter = d;
}

/* returns ID of node */
NODE.prototype.getID = function () {
    return this.ID;
}

/* sets ID of node */
NODE.prototype.setID = function (id) {
    if (this.ID == 0)
        this._ID = id;
    else
        System.out.println("This node has already an ID!");
}

/* returns x-coordinate of node */
NODE.prototype.getX = function () {
    return this.x;
}

/* sets x-coordinate of node */
NODE.prototype.setX = function (x) {
    return this.x = x;
}

/* returns y-coordinate of node */
NODE.prototype.getY = function () {
    return this.y;
}

/* sets y-coordinate of node */
NODE.prototype.setY = function (y) {
    return this.y = y;
}

/* returns y-coordinate of node */
NODE.prototype.getDiameter = function () {
    return this.diameter;
}

/* sets y-coordinate of node */
NODE.prototype.setDiameter = function (d) {
    return this.diameter = d;
}

/* returns name of node */
NODE.prototype.getName = function () {
    return this.name;
}

/* sets name of node */
NODE.prototype.setName = function (name) {
    return this.name = name;
}

/* return polygon of this node for drawing */
NODE.prototype.getPolygon = function () {
    this.p = new Polygon();
    this.m = 360;
    this.r = this.diameter / 2;
    for (j = 0; j < this.m; j++ )
        this.p.addPoint((int)(this.x + this.r + this.r * Math.cos(j * 2 * Math.PI / this.m)),
            (int)(this.y + this.r + this.r * Math.sin(j * 2 * Math.PI / this.m)));
    return this.p;
}

/* return polygon with bigger size of this node for drawing */
NODE.prototype.getBigPolygon = function () {
    this.p = new Polygon();
    this.m = 360;
    this.r = this.diameter;
    for (j = 0; j < this.m; j++ )
        this.p.addPoint((this.x + this.r / 2 + this.r / 1.5 * Math.cos(j * 2 * Math.PI / this.m)),
        (this.y + this.r / 2 + this.r / 1.5 * Math.sin(j * 2 * Math.PI / this.m)));
    return this.p;
}

/* return String with information about node */
NODE.prototype.toString = function () {
    return "n" + this.ID + "(" + this.x + "," + this.y + ") name: " + this.name;
}

/* return how close the node is to another node */
NODE.prototype.proximity = function (cother) {
    return this.proximity(cother.getX(), cother.getY());
}

/* return how far this node is away from a specific point;
   uses the pythagorean theorum to calculate the distance */
NODE.prototype.proximity = function (d, e) {
    this.xdiff = this.x - d;
    this.ydiff = this.y - e;
    return Math.sqrt(this.xdiff * this.xdiff + this.ydiff * this.ydiff);
}