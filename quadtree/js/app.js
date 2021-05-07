function APP(size, defaultValue, id) {
    this.rows = size;
    this.cols = size;
    this.elemId = id;
    this.cellSize = $(id).width() / size;
    this.defaultValue = defaultValue;
    this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
}

APP.prototype.createRaster = function (rows, cols, defaultval) {
    var result = new Array(rows);
    for (var i = 0; i < rows; i++) {
        result[i] = new Array(cols);
    }

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            result[r][c] = defaultval;
        }
    }

    return result;
}

APP.prototype.getRasterlocationObject = function (x, y) {
    var result = {
        row: Math.floor(y / this.cellSize),
        col: Math.floor(x / this.cellSize)
    }

    return result;
}

APP.prototype.getRasterDataValue = function (locationObject) {
    return this.data[locationObject.row][locationObject.col];
}

APP.prototype.setRasterDataValue = function (locationObject, val) {
    this.data[locationObject.row][locationObject.col] = val;
}

APP.prototype.invertRasterDataValue = function (x, y) {
    var loc = this.getRasterlocationObject(x, y);
    var val = this.getRasterDataValue(loc);
    if (val == 0) {
        this.setRasterDataValue(loc, 1);
    } else {
        this.setRasterDataValue(loc, 0);
    }
}

APP.prototype.refresh = function () {
    var ctx = $(this.elemId).get(0).getContext("2d");
    ctx.fillStyle = "#00305e";
    for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
            if (this.data[r][c] == 0) {
                ctx.clearRect(c * this.cellSize, r * this.cellSize, this.cellSize, this.cellSize);
            } else {
                ctx.fillRect(c * this.cellSize, r * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }
}

APP.prototype.resetRaster = function () {
    this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
}

APP.prototype.printChart = function (treeData) {
    // ************** Generate the tree diagram	 *****************
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 500,
        height = 400;

    var i = 0;
    var tree = d3.layout.tree().size([height, width]);

    self.diagonal = d3.svg.line().interpolate('linear')
        .x(function (d) {
            return d.y;
        })
        .y(function (d) {
            return d.x;
        });

    var svg = d3.select("body").append("svg")
		.attr("style", 'display:block; margin: auto;')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    root = treeData[0];

    update(root);

    function update(source) {
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);
        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 100;
        });
		
        // Declare the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });
        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        nodeEnter.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", -5)
            .attr("y", -5)
            .attr("stroke-width", 2)
            .attr("stroke", "#dd2727")
            .style("fill", function (d) {
                if (d.level === "black")
                    return "#00305e";
                else
                    return "#fff";
            });

        // Declare the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });
        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr('d', function (d) {
                return self.diagonal([{
                    y: d.source.x,
                    x: d.source.y
                }, {
                    y: d.target.x,
                    x: d.target.y
                }]);
            });
    }

    $("svg").appendTo("#resultChart");
	
	// Update the width and height using the size of the contents
	var  bbox = $("svg")[0].getBBox();
	$("svg")[0].setAttribute("width", bbox.x + bbox.width + bbox.x);
	$("svg")[0].setAttribute("height", bbox.y + bbox.height + bbox.y);
}

APP.prototype.printGrid = function (data, step, origin) {
    if (data.children) {
        var width = $(this.elemId).width() / Math.pow(2, step);

        var ctx = $(this.elemId).get(0).getContext("2d");
        ctx.beginPath();

        //vertical
        ctx.moveTo(origin.getX() + width / 2, origin.getY());
        ctx.lineTo(origin.getX() + width / 2, origin.getY() + width);
        //horizontal
        ctx.moveTo(origin.getX(), origin.getY() + width / 2);
        ctx.lineTo(origin.getX() + width, origin.getY() + width / 2);

        ctx.strokeStyle = '#dd2727';
        ctx.stroke();

        var elem = this;
        var neworigin;
        step++;
        $.each(data.children, function (index, value) {
            switch (index) {
                case 0:
                    neworigin = new POINT(origin.getX(), origin.getY());
                    break;
                case 1:
                    neworigin = new POINT(origin.getX() + width / 2, origin.getY());
                    break;
                case 2:
                    neworigin = new POINT(origin.getX() + width / 2, origin.getY() + width / 2);
                    break;
                case 3:
                    neworigin = new POINT(origin.getX(), origin.getY() + width / 2);
                    break;
            }
            elem.printGrid(value, step, neworigin);
        });
    }
}

APP.prototype.startQuad = function () {
    var precheck = 0;
    for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
            precheck += this.data[r][c];
        }
    }
    var treeData = [{
        "parent": "null"
    }];

    if (precheck == 0) {
        treeData[0].level = "white";
    } else if (precheck == this.rows * this.cols) {
        treeData[0].level = "black";
    } else {
        treeData[0].children = this.runQuadPart(this.data);
        treeData[0].level = "black";
    }
    this.printChart(treeData);
    this.printGrid(treeData[0], 0, new POINT(0, 0));
}

/*
	Quadrants

	+---+---+
	| 0 | 1 |
	+---+---+
	| 3 | 2 |
	+---+---+
*/

APP.prototype.runQuadPart = function (a) {
    var size = a.length;
    if (size == 1) {
        return a[0][0];
    }
    var limiter = {};
    var sum, tmpRaster;
    var result = [];
    for (var i = 0; i < 4; i++) {
        switch (i) {
            case 0:
                limiter.from_c = 0;
                limiter.to_c = size / 2;
                limiter.from_r = 0;
                limiter.to_r = size / 2;
                break;
            case 1:
                limiter.from_c = size / 2;
                limiter.to_c = size;
                limiter.from_r = 0;
                limiter.to_r = size / 2;
                break;
            case 2:
                limiter.from_c = size / 2;
                limiter.to_c = size;
                limiter.from_r = size / 2;
                limiter.to_r = size;
                break;
            case 3:
                limiter.from_c = 0;
                limiter.to_c = size / 2;
                limiter.from_r = size / 2;
                limiter.to_r = size;
                break;
        }

        var tmpRaster = this.createRaster(size / 2, size / 2);
        sum = 0;
        for (var r = limiter.from_r; r < limiter.to_r; r++) {
            for (var c = limiter.from_c; c < limiter.to_c; c++) {
                sum += a[r][c];
                tmpRaster[r - limiter.from_r][c - limiter.from_c] = a[r][c];
            }
        }
        if (sum == 0) {
            result[i] = {
                "level": "white"
            };
        } else if (sum == (size * size) / 4) {
            result[i] = {
                "level": "black"
            };
        } else {
            result[i] = {
                "level": "black",
                "children": this.runQuadPart(tmpRaster)
            };
        }
    }
    return result;
}
