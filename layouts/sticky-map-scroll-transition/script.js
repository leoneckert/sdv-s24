import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


let w = 550;
let h = 400;
let xPadding = 50;
let yPadding = 50;

let vizContainer = d3.select("#viz1");

// console.log(document.querySelector("#viz1"))

let viz = vizContainer
  .append("svg")
    // .attr("width", w)
    // .attr("height", h)
    .style("background-color", "lavender")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 "+w+" "+h)
;

let mapGroup = viz.append("g");

const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

function zoomed(event) {
  const {transform} = event;
  mapGroup.attr("transform", transform);
  mapGroup.attr("stroke-width", 1 / transform.k);
}

viz.call(zoom);


function gotData(incomingData) {
  let geoData = incomingData[0]
  console.log(geoData);
  // mapGroup.append("rect")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("width", 200)
  //   .attr("height", 190)
  // ;

  let projection = d3.geoMercator()
    .fitExtent([[50, 50], [w - 50, h - 50]], geoData)
  ;

  let pathMaker = d3.geoPath(projection);

  let countries = mapGroup.selectAll(".country").data(geoData.features).enter()
    .append("path")
    .attr("class", "country")
    .attr("d", pathMaker)
  ;

  function zoomToCountry(countryAdminName) {
    countries.transition().attr("fill", "black");
    countries.filter(d=>d.properties.admin == countryAdminName).transition().attr("fill", "blue")

    let countryData = geoData.features.find(d=>d.properties.admin == countryAdminName)
    const [[x0, y0], [x1, y1]] = pathMaker.bounds(countryData);

    viz.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(w / 2, h / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );
  }
  function zoomOut(){
    countries.transition().attr("fill", "black");
    viz.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(0,0)
        .scale(1)
    );
  }


  enterView({
    selector: '.viz1-step2',
    enter: function(el) {
      zoomToCountry("Germany");
    },
    exit: function(el) {
      zoomOut();
    },
    offset: 0.2, // enter at middle of viewport
  });

  enterView({
    selector: '.viz1-step3',
    enter: function(el) {
      zoomToCountry("United States of America");
    },
    exit: function(el) {
      zoomToCountry("Germany");
    },
    offset: 0.2, // enter at middle of viewport
  });

  enterView({
    selector: '.viz1-step4',
    enter: function(el) {
      
      zoomToCountry("China");
    },
    exit: function(el) {
      zoomToCountry("United States of America");
    },
    offset: 0.2, // enter at middle of viewport
  });


  
}


Promise.all([
  d3.json("world.geo.json")
]).then(gotData)











