import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";



let viz = d3.select("#viz-container")
                .append("svg") // selection changed
                    .attr("id", "viz")  // modification of current selection
                    .attr("width", 800)
                    .attr("height", 800)
;

let myCircle = viz.append("circle")
                    .attr("cx", 100)
                    .attr("cy", 300)
                    .attr("r", 90)
;

myCircle.attr("fill", "white");


