/*This class manages a circle consisting of middle point and radius*/
function CIRCLE(p, r) {
    this.p = p;
    this.r = r;
}

CIRCLE.prototype.Circle = function () {                         //not sure if we need this
    p = new POINT(0, 0);
    r = 0;
    return;
}

CIRCLE.prototype.Circle = function (circ) {                     //not sure if we need this
    p = new POINT(circ.p);
    r = circ.r;
    return;
}

CIRCLE.prototype.Circle = function (center, radius) {           //not sure if we need this
    p = new POINT(center);
    r = radius;
    return;
}

/*return middle point of circle*/
CIRCLE.prototype.getMiddlePoint = function (p) {
    return this.p = p;
}

/*return radius of circle*/
CIRCLE.prototype.getRadius = function (r) {
    return this.r = r;
}