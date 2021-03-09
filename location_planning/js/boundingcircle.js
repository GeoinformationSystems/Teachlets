/*This contains computes the smallest bounding circle for a set of points*/
function BOUNDINGCIRCLE(c, r) {
	this.c = c;						//center
	this.r = r;						//radius
	this.p1 = new POINT(x, y);
	this.p2 = new POINT(x, y);
	this.p3 = new POINT(x, y);
}

/*returns distance between two points*/
BOUNDINGCIRCLE.prototype.getDistance = function (p1,p2) {
	return Math.sqrt((p1.getX() - p2.getX()) * (p1.getX() - p2.getX()) + (p1.getY() - p2.getY()) * (p1.getY() - p2.getY()));
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

	c = new POINT(x, y);
	r = distance(c, p1);

	return new CIRCLE(c, r);
}

/*Compute the center and radius of the smallest circle enclosing the n points in P, 
	such that the m points in B lie on the boundary of the circle.*/
BOUNDINGCIRCLE.prototype.minCircle = function (n, p, m, b) {
	var p = [];
	var b = [];
	c = new POINT(-1, -1);
	r = 0;

	//Compute the smallest circle defined by B
	if (m == 1) {
		c = new POINT(b[0]);
		r = 0;
	}
	else if (m == 2) {
		c = new POINT((b[0].getX() + b[1].getX()) / 2, (b[0].getY() + b[1].getY()) / 2);
		r = distance(b[0], c);
	}
	else if (m == 3)
		return findCenterRadius(b[0], b[1], b[2]);

	minC = new CIRCLE(c, r);

	//Now see if all the points in P are enclosed.
	for (i = 0; i < n; i++) {
		if (distance(p[i], minC.getMiddlePoint()) > minC.getRadius()) {
			//... Compute B <--- B union P[i].
			b[m] = new POINT(p[i]);
			//... Recurse
			minC = minCircle(i, p, m + 1, b);
		}
	}
	return minC;
}