/*This class manages a circle consisting of middle point and radius*/

function CIRCLE(p, r) {                                     
    this.p = p;             //middle point      
    this.r = r;             //radius
}

CIRCLE.prototype.Circle = function () {                         //not sure if we need this
    this.p = new POINT(0, 0);
    this.r = 0;
    return;
}

CIRCLE.prototype.Circle = function (circ) {                     //not sure if we need this
    this.p = new POINT(circ.p);
    this.r = circ.r;
    return;
}

CIRCLE.prototype.Circle = function (center, radius) {           //not sure if we need this
    this.p = new POINT(center);
    this.r = radius;
    return;
}

/*return middle point of circle*/
CIRCLE.prototype.getMiddlePoint = function () {
    return this.p = p;
}

/*return radius of circle*/
CIRCLE.prototype.getRadius = function () {
    return this.r = r;
}