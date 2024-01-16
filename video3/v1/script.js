import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.json("celebrity_deaths.json").then(gotData)


// function xLocation(d, i){
//     // console.log(d, i, w);
//     return 100+Math.random()*600;
// }
// function yLocation(d, i){
//     // console.log(d, i, w);
//     return 100+Math.random()*600;
// }

function getTransormation(d, i, data){
    let x = 200;//100 + i*600/data.length;
    let y = 20 + i*960/data.length;
    return "translate("+x+", "+y+")"
}

function getName(d, i){
    return d.name;
}
function getDeathYear(d, i){
    return d.death_year;
}

function gotData(newData){
    
    newData = newData.filter(d=>d.age==100)
    console.log(newData)

    newData = newData.sort((a, b)=>{a.death_year < b.death_year})
 

    let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 800)    
                    .attr("height", 1000)
    ;

    let dataGroups = viz.selectAll("circle").data(newData).enter().append("g")
                                          .attr("class", "dataGroup")
                                          .attr("transform", getTransormation)

    ;

    dataGroups.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 3)
                .attr("fill", "red")
    ;

    dataGroups.append("text")
                .attr("x", 8)
                .attr("y", 4)
                .text(getName)
                .attr("class", "label")
    ;
    dataGroups.append("text")
                .attr("x", -8)
                .attr("y", 4)
                .attr("text-anchor", "end")
                .text(getDeathYear)
                .attr("class", "label")
    ;


    // viz.selectAll("text").data(newData).enter().append("text")
    //                                       .attr("x", xLocation)
    //                                       .attr("y", yLocation)
    //                                       .attr("r", 5)
    // ;

}