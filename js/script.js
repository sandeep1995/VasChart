console.log("Script.js");

var data = {
    labels: ["Sandeep", "Pranay", "Tanmoy", "Sujit"],
    dataset: [15, 25, 13, 19]
};

var chart = new VasChart("canvas");

chart.setData(data).draw();

