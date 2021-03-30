/*This contains computes the smallest bounding circle for a set of points*/

function BOUNDINGCIRCLE(c,r,x,y) {
	this.c = c;						//center
	this.r = r;						//radius
	this.p1 = new POINT(x, y);
	this.p2 = new POINT(x, y);
	this.p3 = new POINT(x, y);
}

/*returns distance between two points*/
BOUNDINGCIRCLE.prototype.getDistance = function (p1, p2) {
	return Math.sqrt((this.p1.getX() - this.p2.getX()) * (this.p1.getX() - this.p2.getX())
		+ (this.p1.getY() - this.p2.getY()) * (this.p1.getY() - this.p2.getY()));
}

/*Given three points defining a circle, compute the center and radius of the circle*/
BOUNDINGCIRCLE.prototype.findCenterRadius = function (p1, p2, p3) {
	this.x = (p3.getX() * p3.getX() * (p1.getY() - p2.getY())
		+ (p1.getX() * p1.getX() + (p1.getY() - p2.getY()) * (p1.getY() - p3.getY()))
		* (p2.getY() - p3.getY()) + p2.getX() * p2.getX() * (-p1.getY() + p3.getY()))
		/ (2 * (p3.getX() * (p1.getY() - p2.getY()) + p1.getX() * (p2.getY() - p3.getY()) + p2.getX()
			* (-p1.getY() + p3.getY())));

	this.y = (p2.getY() + p3.getY()) / 2 - (p3.getX() - p2.getX()) / (p3.getY() - p2.getY())
		* (x - (p2.getX() + p3.getX()) / 2);

	this.c = new POINT(this.x, this.y);
	this.r = distance(this.c, p1);

	return new CIRCLE(this.c, this.r);
}

/*Compute the center and radius of the smallest circle enclosing the n points in P, 
	such that the m points in B lie on the boundary of the circle.*/
BOUNDINGCIRCLE.prototype.minCircle = function (n, p, m, b) {
	this.p = [];
	this.b = [];
	this.c = new POINT(-1, -1);
	this.r = 0;

	//Compute the smallest circle defined by B
	if (m == 1) {
		this.c = new POINT(this.b[0]);
		this.r = 0;
	}
	else if (m == 2) {
		this.c = new POINT((this.b[0].getX() + this.b[1].getX()) / 2, (this.b[0].getY() + this.b[1].getY()) / 2);
		this.r = distance(this.b[0], this.c);
	}
	else if (m == 3)
		return findCenterRadius(this.b[0], this.b[1], this.b[2]);

	this.minC = new CIRCLE(this.c, this.r);

	//Now see if all the points in P are enclosed.
	for (i = 0; i < n; i++) {
		if (distance(this.p[i], this.minC.getMiddlePoint()) > this.minC.getRadius()) {
			//... Compute B <--- B union P[i].
			this.b[m] = new POINT(this.p[i]);
			//... Recurse
			this.minC = minCircle(this.i, this.p, this.m + 1, this.b);
		}
	}
	return this.minC;
}