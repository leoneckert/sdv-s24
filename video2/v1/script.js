import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.json("celebrity_deaths.json").then(gotData)


function xLocation(d, i, w){
    // console.log(d, i, w);
    return 100+Math.random()*600;
}
function yLocation(d, i, w){
    // console.log(d, i, w);
    return 100+Math.random()*600;
}

function gotData(newData){
    
    newData = newData.filter(d=>d.age==100)
    console.log(newData)

 

    let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 800)    
                    .attr("height", 800)
    ;

    viz.selectAll("circle").data(newData).enter().append("circle")
                                          .attr("cx", xLocation)
                                          .attr("cy", yLocation)
                                          .attr("r", 5)
    ;

    // viz.selectAll("text").data(newData).enter().append("text")
    //                                       .attr("x", xLocation)
    //                                       .attr("y", yLocation)
    //                                       .attr("r", 5)
    // ;

}