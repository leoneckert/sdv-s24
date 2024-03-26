let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  // x Scale & Axis
  let maxX = d3.max(incomingData, function(d, i){
    return d.x
  })
  let xScale = d3.scaleLinear().domain([0, maxX]).range([xPadding, w-xPadding]);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale)
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, "+(h-yPadding)+")")

  // y Scale & Axis
  let maxY = d3.max(incomingData, function(d, i){
    return d.y;
  })
  let yScale = d3.scaleLinear().domain([0, maxY]).range([h-yPadding, yPadding]);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  // create group for the visualization
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  function getGroupPosition(d, i){
    let x = xScale(d.x);
    let y = yScale(d.y);
    return "translate("+x+", "+y+")"
  }

  let currentStep = 1;

  function visualizeCurrentData(){

    // FILTERING data to show only a subset
    let dataToShow = incomingData.filter(function(d, i){
      return d.step == currentStep;
    })
    console.log(dataToShow)

    // D3 figures out what needs to be done (entering, updaing, exiting elements)
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
    
    // ENTERING GROUPS
    let enteringGroups = datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
    ;
    enteringGroups.append("circle")
        .attr("r", 30)
        .attr("fill", "red")
    ;
    enteringGroups.append("text")
        .text(function(d, i){
          return d.name
        })
        .attr("x", -17)
        .attr("y", 17)
        .attr("font-family", "sans-serif")
        .attr("font-size", "3em")
        .attr("fill", "white")
    ;
    enteringGroups.attr("transform", getGroupPosition);

    // UPDATING GROUPS
    datagroups.attr("transform", getGroupPosition);

    // EXITING GROUPS
    let exitingGroups = datagroups.exit();
    exitingGroups.remove();
    
  }

  

  document.getElementById("step1").addEventListener("click", function(){
    currentStep = 1;
    visualizeCurrentData();
  });
  document.getElementById("step2").addEventListener("click", function(){
    currentStep = 2;
    visualizeCurrentData();
  });
  document.getElementById("step3").addEventListener("click", function(){
    currentStep = 3;
    visualizeCurrentData();
  });
  document.getElementById("step4").addEventListener("click", function(){
    currentStep = 4;
    visualizeCurrentData();
  });
  document.getElementById("step5").addEventListener("click", function(){
    currentStep = 5;
    visualizeCurrentData();
  });


}



d3.json("data.json").then(gotData);


























