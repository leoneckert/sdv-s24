d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;


function gotData(incomingData){
  console.log(incomingData);
  
  // Order of operation #1:
  // I fix the dates BEFORE restructuring the data.
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  // Order of operation #2: 
  // I retrieve min and max of the data before restructuing the data

  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(incomingData, function(d){ return d.year });
  // while I am at it, I also build the scale and axis
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);
  // same for the y dimension:
  let yMax = d3.max(incomingData, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);


  // Order of operation #3:
  // time to shape the data to fit my goal of drawing two lines:

  // group data by country:
  let groupedData = d3.groups(incomingData, function(d){
    return d.country
  })
  console.log(groupedData)
  
  // flatten the data arrays:
  let groupedDataFLAT = groupedData.map(function(d){
    return d[1]
  })
  console.log(groupedDataFLAT)

  

  // d3.line() returns a function that produces
  // path element's d strings for us.
  let lineMaker = d3.line()
    .x(function(d, i){
      // this happens once for evey data point inside the array lineMaker deals with at a give time (once USA, once CHINA)
      return xScale(d.year);
    })
    .y(function(d, i){
      // same
      return yScale(d.birthsPerThousand);
    })
  ;

  let graphGroup = viz.append("g").attr("class", "graphGroup");

  graphGroup.selectAll(".line").data(groupedDataFLAT).enter()
    .append("path")  // this happens twice, once for the whole USA array and once for the whole China array
      .attr("class", "line")
      .attr("d", lineMaker) // lineMaker received the USA array, then the China array
      .attr("fill", "none")
      .attr("stroke", function(d, i){
        console.log(d[0].country)
        if(d[0].country == "China"){
          return "red"
        }else{
          return "blue"
        }
      })
      .attr("stroke-width", 5)
  ;
}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
  });
}
