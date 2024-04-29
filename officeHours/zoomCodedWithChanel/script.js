import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let w = window.innerWidth;
let h = window.innerHeight;
let xPadding = 70;
let yPadding = 50;




let viz = d3.select("#container")
  .append("svg")
  .attr("class", "viz")
  .attr("width", w)
  .attr("height", h)
  ;

let mapGroup = viz.append("g")

function getColor(d) {
  console.log(d.properties);
  if (d.properties.name === "Canada") {
    return "#0D47A1";
  } else if (d.properties.name === "United States of America") {
    return "#1976D2";
  } else if (d.properties.name === "Norway" || d.properties.name === "Finland" || d.properties.name === "Sweden" || d.properties.name === "Iceland" || d.properties.name === "Thailand") {
    return "#1565C0"
  } else if (d.properties.name === "United Kingdom") {
    return "#1E88E5"
  } else if (d.properties.name === "Germany") {
    return "#42A5F5"
  } else if (d.properties.name === "France") {
    return "#64B5F6"
  } else if (d.properties.name === "China") {
    return "#64B5F6"
  } else if (d.properties.name === "India") {
    return "#90CAF9"
  } else if (d.properties.name === "Nepal") {
    return "#BBDEFB"
  } else if (d.properties.name === "Australia") {
    return "#1565C0"
  } else {
    return "darkgrey"
  }
}





var div = d3.select("body").append("div")
  .attr("class", "tooltip-donut")
  .style("opacity", 0);


  // function gotData(geoData,toiletData) {
function gotData(incomingData) {
  let geoData = incomingData[0];
  let toiletData = incomingData[1];
  let ausGeo = incomingData[2];

  function handleMouseOver(event, d) {
    console.log("over")
    if(d3.select(this).node().getAttribute("opacity") == 0){
      return
    }
    // console.log(d.properties);

    if (d3.select(this).attr("fill") == "darkgrey") {
      return // if the country is lightgrey, this function is done
    }


    d3.select(this)
      .attr("opacity", 0.8)
      .attr("stroke", "black")// Change stroke color on hover
      .attr("stroke-width", 2.5)

    let toiletInfo = toiletData.find(data => data.country === d.properties.name);

    if (toiletInfo) {
      div.transition()
        .duration(50)
        .style("opacity", 1);
      // Use toiletInfo to populate tooltip content as needed
      div.html(`Country: ${d.properties.name}<br>Prevalence: ${toiletInfo.prevalence}<br>Year Started: ${toiletInfo.year}`);
      // console.log(div)
    }


    // solution from: https://www.fabiofranchino.com/log/bring-to-front-and-restore-an-svg-element-with-d3/
    const list = [...this.parentNode.children]
    const index = list.indexOf(this)
    d.oindex = index
    this.parentNode.appendChild(this)

    div.style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  }

  function handleMouseOut(event, d) {
    console.log("out")
    if(d3.select(this).node().getAttribute("opacity") == 0){
      return
    }


    // d3.select(this).classed("active", false )
    // console.log(d);

    d3.select(this)
      .attr("stroke", "lightgrey")// Restore original stroke color on mouse out
      .attr("stroke-width", 1)
      .attr("opacity", 1)
    // solution from: https://www.fabiofranchino.com/log/bring-to-front-and-restore-an-svg-element-with-d3/

    const index = d.oindex
    this.parentNode.insertBefore(this, this.parentNode.children[index])


    // let toiletInfo = toiletData.find(data => data.country === d.properties.name);
    // if (!toiletInfo) {
      div
        // .transition()

        .style("opacity", 0);
    // }



  }


  let AUS = geoData.features.find(d => d.properties.admin == "Australia");

  console.log(geoData.features.find(d => d.properties.admin == "China"))
  let projection = d3.geoMercator()
    // .scale(800)
    // .translate([w / 2, h / 2])
    // .center([104.1954, 35.8617])
    .fitExtent([[50, 50], [w - 50, h - 50]], geoData)
    ;


  let path = d3.geoPath(projection);


  let ausMap = mapGroup.selectAll(".states").data(ausGeo.features).enter()
  .append("path")
  .attr("class", "states")
  .attr("d", path)
  .attr("fill", "none")
  .attr("stroke", "grey")
  .attr("opacity", 0)
  // .on("mouseover", handleMouseOver)
  //   .on("mouseout", handleMouseOut)
  ;

  let countries = mapGroup.selectAll(".provinces").data(geoData.features).enter()
    //what is features?
    .append("path")
    .attr("class", "provinces")
    .attr("d", path)
    .attr("fill", getColor)
    .attr("stroke", "lightgrey")
    .attr("stroke-width", 1)
    .attr("opacity", 1)
    // .on("click", clicked)
    // .attr("opacity",getOpacity)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
  ;


  let selectedCountries = viz.selectAll(".selected").data(toiletData).enter()
    .append("path")
    .attr("class", "selected")
    .text(getText)

  function getText(d) {

  }

  function zoomToAUS() {
    div.remove()
    console.log("DSDS ")
    // console.log(countries.filter(d=>{
    //   console.log(d)
    // }))

    const [[x0, y0], [x1, y1]] = path.bounds(AUS);
    // event.stopPropagation();
    // countries.transition().style("fill", null);
    // d3.select(this).transition().style("fill", "red");
    viz.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(w / 2, h / 2)
        // .scale(0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h))
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );

    countries.filter(d=>d.properties.admin == "Australia").transition().duration(750).attr("opacity", 0);
    ausMap.transition().duration(750).attr("opacity", 1);

    // projection.center([0,0]);

    // let newProjection = d3.geoMercator()
    //   // .fitExtent([[50, 50], [w - 50, h - 50]], AUS)
    //   .scale(800)
    //   .translate([w / 2, h / 2])
    //   .center([104.1954, 35.8617])
    // ;

    
    // projection.fitExtent([[100, 100], [w - 100, h - 100]], geoData)

  
    // projection.fitExtent([[100, 100], [w - 100, h - 100]], CHN)
    // projection.scale(100).center([0,0]);

    // pathMaker = d3.geoPath(projection);
    // countries.transition().duration(750).attrTween("d", interpolateProjection(projection, newProjection));

    // countries.transition().duration(800).attr("d", pathMaker)
    // ausMap.transition().duration(800).attr("d",pathMaker)

  }

  const zoom = d3.zoom()
    .scaleExtent([0.1, 8])
    .on("zoom", zoomed);

  viz.call(zoom);

  function zoomed(event) {
    const {transform} = event;
    mapGroup.attr("transform", transform);
    mapGroup.attr("stroke-width", 1 / transform.k);
  }
  function clicked(event, d) {
    // console.log(d3.pointer(event, viz.node()))
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    countries.transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    viz.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(w / 2, h / 2)
        // .scale(0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h))
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      // d3.pointer(event, viz.node())
    );
  }

  




  document.body.addEventListener("click", function () {
    console.log("hello")
    zoomToAUS();
  })


}

// d3.json("world_lowres.json").then(function(geoData){
//   d3.csv("countries.csv").then(function(toiletData){
//     gotData(geoData,toiletData)
//   })
// })

Promise.all([
  d3.json("world_lowres.json"),
  d3.csv("countries.csv"),
  d3.json("aus_lga.geojson")
]).then(gotData)

// d3.json("world_lowres.json").then(gotData)




//high res:
// d3.json("world_countries_geojson.geojson").then(gotData)


