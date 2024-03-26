import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let w = 1200;
let h = 800;
let paddingX = 70;
let paddingY = 70;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "rgb(104 106 171)")
;

function gotData(incomingData){
  console.log(incomingData);

  // filter out what we don't want to visualized
  let filteredData = incomingData.filter(d=>d.Code == "CHN" || d.Code == "USA");

  let timeParser = d3.timeParse("%Y");

  // clean data
  let filteredDataWithTimeObjects = filteredData.map(d=>{
    d.Year = timeParser(d.Year);
    let key = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"
    d.incidence = parseFloat( d[key] )
    delete d[key];

    return d
  });

  // X SCALE THINGS
  let yearExtent = d3.extent(filteredDataWithTimeObjects, d=>d.Year)
  let xScale = d3.scaleTime().domain(yearExtent).range([paddingX, w-paddingX])
  // x axis:
  let xAxisGroup = viz.append("g").attr("class", "xAxisGroup");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0,"+ (h-40) +")")

  // Y SCALE THINGS
  let incidentExtent = d3.extent(filteredDataWithTimeObjects, d=>d.incidence)
  let yScale = d3.scaleLinear().domain(incidentExtent).range([h-paddingY, paddingY])
  // y axis
  let yAxisGroup = viz.append("g").attr("class", "yAxisGroup"); 
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate(50,0)")

  // DRAWING THINGS
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  let datagroups = vizGroup.selectAll(".datagroup").data(filteredDataWithTimeObjects).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", (d, i)=>{
        return "translate("+ xScale(d.Year) +", "+ yScale(d.incidence) +")"
      });
  ;

  datagroups.append("svg:image")
    .attr('x', -20)
    .attr('y', -20)
    .attr('width', 40)
    .attr('height', 40)
    .attr("xlink:href", "flag.png")
  ;

  datagroups.append("text")
      .attr("class", "countryLabel")
      .attr("x", 10)
      .attr("y", 0)
      .text((d, i)=>d.Code)
  ;

}


d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
