import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;


function gotData(incomingData){
  console.log(incomingData);

  // turn numbers in each datapoint into arrays:
  incomingData = incomingData.map(function(d){
    d.number = new Array(parseInt(d.number)).fill(0); // the fill is not needed, but the array looks better in the console
    // d.number = d.number.map(d=>{return 4})
    return d
  })
  console.log(incomingData);

  let largeDataGroups = viz.selectAll(".largeGroup")
      .data(incomingData).enter()
    .append("g")
      .attr("class", "largeGroup")
  ;



  

  // now we can append to the large 
    
  //rectangle to large group:
  largeDataGroups.append("rect")
      .attr("x", 0)
      .attr("y", -90)
      .attr("width", 30)
      .attr("height", 90)
  ;
  // label to large group
  largeDataGroups.append("text")
    .attr("x", 0)
    .attr("y", 12)
    .text(function(d, i){
      return d.name
    })
  ;

  // move entire group
  largeDataGroups.attr("transform", function(d, i){
    let x = xPadding + i*80;
    let y = h-yPadding
    return "translate("+x+", "+y+")"
  })


  // this is the decisive part: we bind data to the nested groups!!!!
  //                    within large group!
  let smallGroupWithin = largeDataGroups.selectAll(".smallGroup")
      .data(function(d){ //using a data function we pull out the inner array from each data point of the larger array
        return d.number 
      }).enter()
    .append("g")
      .attr("class", "smallGroup")
  ;

  // now we can append to the small groups. large group are collections of small groups

  // circle to small group!!!
  smallGroupWithin.append("circle")
      .attr("cx", 15)
      .attr("cy", function(d, i){
        return -10-i*11
      })
      .attr("r", 5)
      .attr("fill", "white")
  ;
  




}


// load data
d3.csv("data.csv").then(gotData);



