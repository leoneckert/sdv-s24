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


let data = [
  {
    id: "A",
    val: 20
  },
  {
    id: "B",
    val: 40
  },
  {
    id: "C",
    val: 90
  }
]

function getGroupPos(d, i){
  let x = (d.val/100) * w;
  let y = h/2;
  return "translate("+x+", "+y+")"
}

let dataGroups = viz.selectAll(".datapoint").data(data).enter().append("g")
      .attr("class", "datapoint")
      .attr("transform", getGroupPos)
  ;


dataGroups.append("circle")
  .attr("r", 20)
;




