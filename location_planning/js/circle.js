/*This class manages a circle consisting of middle point and radius*/

function CIRCLE(p, r) {                                     
    this.p = p;             //middle point      
    this.r = r;             //radius
}

/*return middle point of circle*/
CIRCLE.prototype.getMiddlePoint = function () {
    return this.p;
}

/*return radius of circle*/
CIRCLE.prototype.getRadius = function () {
    return this.r;
}