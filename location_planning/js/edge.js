/* Class manages edge between two nodes */

/*
public class Edge implements Cloneable
*/

function EDGE(s, e, w) {
    this.start = s;
    this.end = e;
    this.weight = w;
    this.reverse = new EDGE(w, e, s);
}

function EDGE(s, e, w) {
    this.start = s;
    this.end = e;
    this.weight = w;
    this.reverse = new EDGE(w, e, s);
}

function EDGE(e, w) {
    this.start = e.getStartNode();
    this.end = e.getEndNode();
    this.weight = w;
    this.reverse = e.getReverse();
}

function EDGE(e, w, s) {
    this.start = s;
    this.end = e;
    this.weight = w;
    this.reverse = null;
}

/* return first node of edge */
EDGE.prototype.getStartNode = function() {
    return this.start;
}

/* return second node of edge */
EDGE.prototype.getEndNode = function () {
    return this.end;
}

/* return weight of edge */
EDGE.prototype.getWeight = function () {
    return this.weight;
}

/* return edge with reverse start and end of edge */
EDGE.prototype.getReserve = function () {
    return this.reserve;
}

/* return String with information about edge */
EDGE.prototype.toString = function () {
    return "{" + this.start.getID() + "-" + this.end.getID() + ":" + this.weight + "}";	
}