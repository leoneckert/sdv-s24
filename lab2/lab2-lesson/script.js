import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let myData = [4, 6, 8, 2, 9];

let viz = d3.select("#viz-container")
                .append("svg") // selection changed
                    .attr("id", "viz")  // modification of current selection
                    .attr("width", 800)
                    .attr("height", 800)
;

//                0            5
viz.selectAll("circle").data(myData).enter().append("circle")
                                        .attr("cx", 100)
                                        .attr("cy", 400)
                                        .attr("r", 90)
;
