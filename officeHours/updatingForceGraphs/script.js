import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;



const simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody().strength(0.0001))
        .force("x", d3.forceX(w/2).strength(0.03))
        .force("y", d3.forceY(h/2).strength(0.03))
      .force("collide", d3.forceCollide().radius(8).strength(0.8))
      .on("tick", ticked)
      

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

let datapoints = viz.append("g")
      .attr("class", "vizGroup")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle");

console.log(datapoints);

function ticked() {
  datapoints.attr("cx", d => d.x)
            .attr("cy", d => d.y)

}

function gotData(incomingData){
  console.log(incomingData);

  let dataByTime = incomingData.filter(d=>d.time == 1);
  console.log(dataByTime);
  let data = dataByTime.map(d=>d3.range(d.number).map(dd=>{
    
    return {gender: d.gender}
  }))
  console.log(data);
  data = data.map(genderArray=>{
    return genderArray.map((d, i)=>{
      return {gender:d.gender, id: d.gender+"-"+i, x:d.gender=="M"?w/2-300:w/2+300, y:h/2+(-50+Math.random()*100)}
    })
  }).flat()
  console.log(data);
  
  
  //.flat()
  


  function update(newData, runSim) {

    // Make a shallow copy to protect against mutation, while
    // recycling old nodes to preserve position and velocity.
    // console.log(datapoints.data())
    // const old = new Map(datapoints.data().map(d => [d.id, d]));
    // console.log(old.get("M-0"))
    // newData = newData.map(d => Object.assign(old.get(d.id) || {}, d));

    // links = links.map(d => Object.assign({}, d));
    console.log("newData", newData)

    if(!runSim) return 
    console.log("hi")
    simulation.nodes(newData);
    // simulation.force("link").links(links);
    simulation.alpha(1).restart();

    datapoints = datapoints.data(newData, d=>d.id)
      .join(
        enter => enter.append("circle")
        .attr("r", 8)
        .attr("fill", function(d){
          if(d.gender == "M"){
            return "blue"
          }else{
            return "pink"
          }
        }),
        update => update,
        exit => exit.transition().duration(500).attr("cy", h-50).remove()
        );



  }
  // update(data, true)

  let dataIdx = 0
  // document.body.addEventListener("click", function(){
  document.querySelector("#timeSlider").addEventListener("change", function(e){

    dataByTime = incomingData.filter(d=>d.time == parseInt(e.target.value));
    console.log(dataByTime);
    data = dataByTime.map(d=>d3.range(d.number).map(dd=>{return {gender: d.gender}}))
    // console.log(data);
    data = data.map(genderArray=>{
      return genderArray.map((d, i)=>{
        let id = d.gender+"-"+i;
        const old = new Map(datapoints.data().map(d => [d.id, d]));
        if(old.get(id)){  
          return old.get(id)
        }else{
          return {gender:d.gender, id: d.gender+"-"+i, x:d.gender=="M"?w/2-300:w/2+300, y:h/2+(-50+Math.random()*100)}

        }
        // newData = newData.map(d => Object.assign(old.get(d.id) || {}, d));
        // // return {gender:d.gender, id: d.gender+"-"+i, x:d.gender=="M"?w/2-300:w/2+300, y:h/2+(-50+Math.random()*100)}
        // return {gender:d.gender, id: d.gender+"-"+i, x:"hi"}

      })
    }).flat()
    update(data, true);
    dataIdx++
  })


}


// load data
d3.csv("data.csv").then(gotData);




document.querySelector("#timeSlider").addEventListener("change", function(e){
  console.log(parseInt(e.target.value))
})
