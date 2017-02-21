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
    };

    this._lineChartData = [];

    this._xPadding = null;
    this._yPadding = null;
    this._labelsCount = null;
};

VasChart.prototype.setData = function (data) {
    this._data = data;
    this._labelsCount = this._data.labels.length;
    return this;
};

VasChart.prototype._setAxis = function () {
    // Setting the length of the both Axis
    this._xPadding = Math.round(this._width * 0.1);
    this._yPadding = Math.round(this._height * 0.1);

    this._xAxis.length = Math.round(this._width - this._xPadding);
    this._yAxis.length = Math.round(this._height - this._yPadding);

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
    return this;
}

VasChart.prototype._drawAxis = function () {
    //Draw X axis
    this._drawLine(this._xAxis.startPos, this._xAxis.endPos);
    this._drawLine(this._yAxis.startPos, this._yAxis.endPos);
    return this;
};

VasChart.prototype._map = function (x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

VasChart.prototype._getMax = function (arr) {
    return Math.max.apply(null, arr);
};


VasChart.prototype._getMin = function (arr) {
    return Math.min.apply(null, arr);
}

VasChart.prototype._buildLineChartData = function () {


    var xStep = this._xAxis.length / this._labelsCount;

    var initialXPoint = this._xPadding;
    var maxY = this._getMax(this._data.dataset);
    var minY = this._getMin(this._data.dataset);


    for (var i = 0; i < this._labelsCount; i++) {

        this._lineChartData.push({
            x: initialXPoint,
            y: this._map(this._data.dataset[i], minY, maxY, this._yPadding, this._height)
        });
        // Write the labels
        this._writeLine(this._data.labels[i], initialXPoint, this._yPadding/2);
        initialXPoint += xStep;
    }

};

VasChart.prototype._writeLine = function (text, x, y) {
    // TODO:: write the text correctly
    this._ctx.fillText(text, x, y);
}



VasChart.prototype.draw = function () {
    this._setContextOriginLowerLeft();
    this._setAxis();
    this._drawAxis();
    this._buildLineChartData();

    for (var i = 0; i < this._labelsCount - 1; i++) {
        this._drawLine(this._lineChartData[i], this._lineChartData[i + 1]);

    }

    console.log("Draw");
};


