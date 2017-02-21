console.log("VasChart.js");

var VasChart = function (elem) {
    this._elem = document.querySelector(elem);
    this._data = {};

    this._ctx = this._elem.getContext("2d");
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";

    this._height = this._elem.height;
    this._width = this._elem.width;

    this._xAxis = {
        startPos: { x: null, y: null },
        endPos: { x: null, y: null },
        length: null
    };

    this._yAxis = {
        startPos: { x: null, y: null },
        endPos: { x: null, y: null },
        length: null
    };

    this._origin = {
        x: null,
        y: null
    }
};

VasChart.prototype.setData = function (data) {
    this._data = data;
    return this;
};

VasChart.prototype._setAxis = function () {
    // Setting the length of the both Axis
    this._xAxis.length = Math.round(this._width * 0.9);
    this._yAxis.length = Math.round(this._height * 0.9);

    this._origin.x = this._width - this._xAxis.length;
    this._origin.y = this._height - this._yAxis.length;

    // Calcluate the start and end position of the X Axis
    this._xAxis.startPos = this._origin;
    this._xAxis.endPos.x = this._width;
    this._xAxis.endPos.y = this._origin.y;

    // Calcluate the start and end position of the Y Axis
    this._yAxis.startPos = this._origin;
    this._yAxis.endPos.x = this._origin.x;
    this._yAxis.endPos.y = this._height;


    return this;
};

VasChart.prototype._drawLine = function (start, end) {
    this._ctx.beginPath();
    this._ctx.moveTo(start.x, start.y);
    this._ctx.lineTo(end.x, end.y);
    this._ctx.stroke();
    return this;
};

VasChart.prototype._setContextOriginLowerLeft = function () {
    this._ctx.translate(0, this._height);
    this._ctx.scale(1, -1);
}

VasChart.prototype._drawAxis = function () {
    //Draw X axis
    this._drawLine(this._xAxis.startPos, this._xAxis.endPos);
    this._drawLine(this._yAxis.startPos, this._yAxis.endPos);
    return this;
};

VasChart.prototype.draw = function () {
    this._setContextOriginLowerLeft();
    this._setAxis();
    this._drawAxis();

    console.log("Draw");
}


