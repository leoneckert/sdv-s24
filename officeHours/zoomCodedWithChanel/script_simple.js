import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let w = window.innerWidth*0.8;
let h = window.innerHeight;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
  .attr("class", "viz")
  .attr("width", w)
  .attr("height", h)
;

function getColor(d) {
  if (d.properties.name === "Canada") {
    return "indigo";
  } else if (d.properties.name === "United States of America") {
    return "lavender";
  } else if (d.properties.name === "Norway" || d.properties.name === "Finland" || d.properties.name === "Sweden" || d.properties.name === "Iceland" || d.properties.name === "Thailand") {
    return "lightcyan"
  } else if (d.properties.name === "United Kingdom") {
    return "orangered"
  } else if (d.properties.name === "Germany") {
    return "olivedrab"
  } else if (d.properties.name === "France") {
    return "navajowhite"
  } else if (d.properties.name === "China") {
    return "maroon"
  } else if (d.properties.name === "India") {
    return "pink"
  } else if (d.properties.name === "Nepal") {
    return "blue"
  } else if (d.properties.name === "Australia") {
    return "green"
  } else {
    return "darkgrey"
  }
}

// var div = d3.select("body").append("div")
//      .attr("class", "tooltip-donut")
//      .style("opacity", 0);

// var path = svg.selectAll('path')
//      .data(pie(totals))
//      .enter()
//      .append('path')
//      .attr('d', arc)
//      .attr('fill', function (d, i) {
//           return color(d.data.title);
//      })
//      .attr('transform', 'translate(0, 0)')
//      .on('mouseover', function (d, i) {
//           d3.select(this).transition()
//                .duration('50')
//                .attr('opacity', '.85');
//           //makes the new div appear on hover:
//           div.transition()
//                .duration(50)
//                .style("opacity", 1);
//      })
//      .on('mouseout', function (d, i) {
//           d3.select(this).transition()
//                .duration('50')
//                .attr('opacity', '1');
//           //makes the new div disappear:
//           div.transition()
//                .duration('50')
//                .style("opacity", 0);
//      });

function handleMouseOver(d, i) {


  // d3.select(this).classed("active", true )
  


  // console.log(d)
  if (d3.select(this).attr("fill") == "darkgrey") {
    return // if the country is lightgrey, this function is done
  }

  d3.select(this)
  .style("opacity",0.8)
    .attr("stroke", "blue")// Change stroke color on hover
    .attr("stroke-width", 2.5)

  

  // solution from: https://www.fabiofranchino.com/log/bring-to-front-and-restore-an-svg-element-with-d3/
  const list = [...this.parentNode.children]
  const index = list.indexOf(this)
  d.oindex = index
  this.parentNode.appendChild(this)

}

function handleMouseOut(d, i) {
  // d3.select(this).classed("active", false )
  
  
  d3.select(this)
    .attr("stroke", "lightgrey")// Restore original stroke color on mouse out
    .attr("stroke-width", 1)
    .style("opacity",1)
  // solution from: https://www.fabiofranchino.com/log/bring-to-front-and-restore-an-svg-element-with-d3/

  const index = d.oindex
  this.parentNode.insertBefore(this, this.parentNode.children[index])
}


function gotData(geoData) {
  let CHN = geoData.features.find(d=>d.properties.admin == "China");

  console.log(geoData.features.find(d=>d.properties.admin == "China"))
  let projection = d3.geoMercator()
    // .scale(800)
    // .translate([w / 2, h / 2])
    // .center([104.1954, 35.8617])
    .fitExtent([[100, 100], [w-100, h-100]], CHN)
  ;


  let pathMaker = d3.geoPath(projection);

  let countries = viz.selectAll(".provinces").data(geoData.features).enter()
    //what is features?
    .append("path")
    .attr("class", "provinces")
    .attr("d", pathMaker)
    .attr("fill", getColor)
    .attr("stroke", "lightgrey")
    .attr("stroke-width", 1)
   // .attr("opacity",getOpacity)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


  function zoomOut(){
    // projection.center([0,0]);
    projection.fitExtent([[50, 50], [w-50, h-50]], geoData)
    pathMaker = d3.geoPath(projection);
    countries.transition().attr("d", pathMaker)

  }


  document.body.addEventListener("click", function(){
    console.log("hello")
    zoomOut();
  })



}

// d3.json("world_lowres.json").then(function(geoData){
//   d3.csv("countries.csv").then(function(toiletData){
//     gotData(geoData,toiletData)
//   })
// })

d3.json("world_lowres.json").then(gotData)




//high res:
// d3.json("world_countries_geojson.geojson").then(gotData)


