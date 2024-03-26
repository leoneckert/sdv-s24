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


  function filterFunction(datapoint){
    if(datapoint.Code == "CHN" || datapoint.Code == "USA"){
      return true
    }else{
      return false
    }
  }
  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);


  // https://d3js.org/d3-time-format
  // 8~14:30
  let timeParser = d3.timeParse("%Y");
  // let test = timeParser("2011");
  // console.log(test);

  function mapFunction(datapoint){
    datapoint.Year = timeParser(datapoint.Year);
    
    let key = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"
    datapoint.incidence = parseFloat( datapoint[key] )
    delete datapoint[key];

    return datapoint
  }
  let filteredDataWithTimeObjects = filteredData.map(mapFunction);
  console.log(filteredDataWithTimeObjects);


  // X SCALE THINGS
  function getYear(d, i){
    return d.Year
  }
  let minyear = d3.min(filteredDataWithTimeObjects, getYear)
  console.log(minyear)
  let maxyear = d3.max(filteredDataWithTimeObjects, getYear)
  console.log(maxyear)
  // let yearExtent = d3.extent(filteredDataWithTimeObjects, getYear)
  // console.log(yearExtent)
  let xScale = d3.scaleTime().domain([minyear, maxyear]).range([paddingX, w-paddingX])
  // console.log( xScale(maxyear) )

  // make a group to contain axis:
  let xAxisGroup = viz.append("g").attr("class", "xAxisGroup");
  // build the axis with the repective scale supplied
  let xAxis = d3.axisBottom(xScale);
  // put axis elements into prepared group element:
  xAxisGroup.call(xAxis)
  // move the axis down, but keep it on the current x alignment
  xAxisGroup.attr("transform", "translate(0,"+ (h-40) +")")

  // Y SCALE THINGS
  function getIncidents(d, i){
    return d.incidence
  }
  let incidentExtent = d3.extent(filteredDataWithTimeObjects, getIncidents)
  console.log(incidentExtent);
  let yScale = d3.scaleLinear().domain(incidentExtent).range([h-paddingY, paddingY])

  let yAxisGroup = viz.append("g").attr("class", "yAxisGroup"); 
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate(50,0)")

  // DRAWING THINGS

  let vizGroup = viz.append("g").attr("class", "vizGroup");
  //                                  0                 56                      56
  let datagroups = vizGroup.selectAll(".datagroup").data(filteredDataWithTimeObjects).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  // datagroups.append("circle")
  //     .attr("cx", 0)
  //     .attr("cy", 0)
  //     .attr("r", 10)
  // ;

  datagroups.append("svg:image")
    .attr('x', -20)
    .attr('y', -20)
    .attr('width', 40)
    .attr('height', 40)
    .attr("xlink:href", "flag.png")
  ;

  function getCountryLabel(d, i){
    return d.Code
  }
  datagroups.append("text")
      .attr("class", "countryLabel")
      .attr("x", 10)
      .attr("y", 0)
      .text(getCountryLabel)
  ;
  // function getYearLabel(d, i){
  //   return d.Year.getFullYear()
  // }
  // datagroups.append("text")
  //     .attr("class", "yearLabel")
  //     .attr("x", 10)
  //     .attr("y", 12)
  //     .text(getYearLabel)
  // ;


  // Position the data groups!
  function getGroupPosition(d, i){
    // let x = paddingX + Math.random()*(w-2*paddingX);
    let x = xScale(d.Year);
    // let y = paddingY + Math.random()*(h-2*paddingY);
    let y = yScale(d.incidence);
    return "translate("+x+", "+y+")"
  }
  datagroups.attr("transform", getGroupPosition);






}


d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
