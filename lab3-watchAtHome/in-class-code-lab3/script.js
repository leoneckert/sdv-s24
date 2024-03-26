import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("width", 500)
                    .attr("height", 500)
                    .attr("id", "viz")
;

// function getX(d, i){
//     return 100 + Math.random() * 300 // 0-400
// }

// function getY(d, i){
//     return 100 + Math.random() * 300 // 0-400
// }

// from: https://stackoverflow.com/a/23202637
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function getName(d, i){
    return d.Title;
}

function getLocation(d, i){
    let x = 50 + Math.random() * 400; // 0-400
    // let y = 50 + Math.random() * 400; // 0-400
    let y = scale(d.Score, 8.5, 9.5, 50, 450)
    return "translate("+x+", "+y+")"
}


function gotData(incomingData){
    console.log(incomingData);
    let subset = incomingData.slice(0, 100);
    console.log(subset);

    let datagroups = viz.selectAll(".mangaGroup").data(subset).enter().append("g")
        .attr("class", "mangaGroup")
        .attr("transform", getLocation)
    ;

    datagroups.append("circle")
                .attr("class", "mangaItem")
                // .attr("cx", getX)
                // .attr("cy", getY)
                .attr("r", 5)
    ;

    datagroups.append("text")
                .attr("class", "mangaTitle")
                .attr("x", 7)
                .attr("y", 6)
                .text(getName)
    ;



}





d3.json("manga.json").then(gotData);