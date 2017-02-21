console.log("Script.js");

var data = {
    labels: ["Sandeep", "Pranay", "Tanmoy", "Sujit"],
    dataset: [10, 20, 15, 5]
};

var chart = new VasChart("canvas");

chart.setData(data).draw();

