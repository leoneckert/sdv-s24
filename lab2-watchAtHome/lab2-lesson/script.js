import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let viz = d3.select("#viz-container")
                .append("svg") // selection changed
                    .attr("id", "viz")  // modification of current selection
                    .attr("width", 800)
                    .attr("height", 800)
;



// let myData = [3, 6, 8, 2, 15];

// // js callback function intro

// function xLocation(d){
//     console.log(d)
//     return d * 50;
// }

// function getColor(d){

// }


// //                0            5
// viz.selectAll("circle").data(myData).enter().append("circle")
//                                         .attr("cx", xLocation)
//                                         .attr("cy", 400)
//                                         .attr("r", 10)
//                                         .attr("fill", getColor)
// ;

// function xLocation(d){
//     console.log(d["Population_%Change"])
//     return 400 + d["Population_%Change"]*400
// }

function gotData(rawData){
    console.log(rawData)
    

    //                0            142
    viz.selectAll("circle").data(rawData).enter().append("circle")
                                            .attr("cx", (d)=>{
                                                return 400 + d["Population_%Change"]*400
                                            })
                                            .attr("cy", 400)
                                            .attr("r", 10)
                                            .attr("fill", "red")
    ;



}

d3.json("Wikipedia-World-Statistics-2023.json").then(gotData);
