/*This contains computes the smallest bounding circle for a set of points*/

function BOUNDINGCIRCLE() {
	// empty 'constructor'
}

/*returns distance between two points*/
BOUNDINGCIRCLE.prototype.getDistance = function (p1, p2) {	
	return Math.sqrt((p1.getX() - p2.getX()) * (p1.getX() - p2.getX()) 
		+ (p1.getY() - p2.getY()) * (p1.getY() - p2.getY()));
}

/*Given three points defining a circle, compute the center and radius of the circle*/
BOUNDINGCIRCLE.prototype.findCenterRadius = function (p1, p2, p3) {
	var x = (p3.getX() * p3.getX() * (p1.getY() - p2.getY())
		+ (p1.getX() * p1.getX() + (p1.getY() - p2.getY()) * (p1.getY() - p3.getY()))
		* (p2.getY() - p3.getY()) + p2.getX() * p2.getX() * (-p1.getY() + p3.getY()))
		/ (2 * (p3.getX() * (p1.getY() - p2.getY()) + p1.getX() * (p2.getY() - p3.getY()) + p2.getX()
			* (-p1.getY() + p3.getY())));

	var y = (p2.getY() + p3.getY()) / 2 - (p3.getX() - p2.getX()) / (p3.getY() - p2.getY())
		* (x - (p2.getX() + p3.getX()) / 2);

	var c = new POINT(x, y);
	var r = this.getDistance(c, p1);

	return new CIRCLE(c, r);
}

/*Compute the center and radius of the smallest circle enclosing the n points in P, 
	such that the m points in B lie on the boundary of the circle.*/
// n: number of all points on the map
// p: list of all points on the map (with x and y values)
// m: current number of points in b
// b: set of 3 points out of p 
BOUNDINGCIRCLE.prototype.minCircle = function (n, p, m, b) {

	// reset current center and radius every run
	var center = new POINT(-1, -1);
	var radius = 0;

	//Compute the smallest circle defined by B
	if (m == 1) {
		center = b[0];
		radius = 0;
	}
	else if (m == 2) {
		center = new POINT((b[0].getX() + b[1].getX()) / 2, (b[0].getY() + b[1].getY()) / 2);
		radius = this.getDistance(b[0], center);
	}
	else if (m == 3)
		return this.findCenterRadius(b[0], b[1], b[2]);

	var minC = new CIRCLE(center, radius);

	//Now see if all the points in P are enclosed.
	for (i = 0; i < n; i++) {
		if (this.getDistance(p[i], minC.getMiddlePoint()) > minC.getRadius()) {
			// ... Compute B <--- B union P[i].
			b[m] = p[i];
			// ... Recurse
			minC = this.minCircle(i, p, m + 1, b);
		}
	}
	return minC;
}