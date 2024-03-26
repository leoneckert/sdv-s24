import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#ffb7ff")
;

let timeParse = d3.timeParse("%Y")
// console.log( timeParse("2003")  )

function filterFunction(datapoint){
  if(datapoint.Approximate_sales > 30000000){
    return true
  }else{
    return false
  }
}

function mapFunction(datapoint){
  datapoint.First_published = timeParse(datapoint.First_published)
  return datapoint
}

function transformData(dataToTransform){
  // size dataset down
  let smallerSet = dataToTransform.filter(filterFunction)

  // turn year strings into js date objects
  let dataWithDateObject = smallerSet.map(mapFunction)
  //
  // clean out null values that can't be mapped
  let cleanData = dataWithDateObject.filter(datapoint=>{
    return datapoint.First_published != null
  })


  return cleanData
}


function gotData(incomingData){
  console.log(incomingData);

  let transformedData = transformData(incomingData)

  transformedData.sort((a, b)=>{
    return a.First_published-b.First_published
  })

  console.log(transformedData)

  function getYear(d){
    return d.First_published
  }
  let earliestYear = d3.min(transformedData, getYear);
  let latestYear = d3.max(transformedData, getYear);
  console.log(earliestYear)
  console.log(latestYear)

  let timeScale = d3.scaleTime().domain( [earliestYear, latestYear] ).range([50, w-300])

  //                                    0             54                54
  let datagroups = viz.selectAll(".datagroup").data(transformedData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  datagroups
    .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 10)
      .attr("fill", "white")
  ;

  function getLabel(d, i){
    // return d.First_published.getFullYear()
    return d.Book + "  " + d.First_published.getFullYear()
  }
  datagroups
    .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text(getLabel)
  ;

  function getGroupPosition(d, i){
    let x = timeScale(d.First_published)
    let y = 100 + (h-200)/51*i;
    return "translate(" + x + ", " + y + ")"
  }
  datagroups.attr("transform", getGroupPosition);





}


d3.json("Books.json").then(gotData);
