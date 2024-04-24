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


const data = [
  {
    id: "A",
    val: 10 + Math.random()*80,
    step: 0
  },
  {
    id: "A",
    val: 10 + Math.random()*80,
    step: 1
  },
  {
    id: "A",
    val: 10 + Math.random()*80,
    step: 2
  },
  {
    id: "A",
    val: 10 + Math.random()*80,
    step: 3
  },
  {
    id: "B",
    val: 10 + Math.random()*80,
    step: 0
  },
  {
    id: "B",
    val: 10 + Math.random()*80,
    step: 1
  },
  {
    id: "B",
    val: 10 + Math.random()*80,
    step: 2
  },
  {
    id: "C",
    val: 10 + Math.random()*80,
    step: 0
  },
  {
    id: "C",
    val: 10 + Math.random()*80,
    step: 1
  },
  {
    id: "C",
    val: 10 + Math.random()*80,
    step: 2
  },
  {
    id: "C",
    val: 10 + Math.random()*80,
    step: 3
  },
  {
    id: "D",
    val: 10 + Math.random()*80,
    step: 2
  },
  {
    id: "D",
    val: 10 + Math.random()*80,
    step: 3
  }
]


function getGroupPosENTER(d, i){
  let x = (d.val/100) * w;
  let y = -50;
  return "translate("+x+", "+y+")"
}
function getGroupPos(d, i){
  let x = (d.val/100) * w;
  let y = h/2;
  return "translate("+x+", "+y+")"
}
function getGroupPosEXIT(d, i){
  let x = (d.val/100) * w;
  let y = h+50;
  return "translate("+x+", "+y+")"
}


function updateGraph(dataToShow){
  let dataGroups = viz.selectAll(".datapoint").data(dataToShow, function(d){return d.id})
  
  // enter:
  let enteringGroups = dataGroups.enter().append("g")
    .attr("class", "datapoint")
  ;

  enteringGroups.attr("transform", getGroupPosENTER)
    .transition()
    .attr("transform", getGroupPos)
  ;

  enteringGroups.append("circle")
    .attr("r", 20)
    .attr("fill", "blue")
  ;
  enteringGroups.append("text")
    .text(function(d){
      return d.id;
    })
    .attr("fill", "white")
  ;

  // updating:
  dataGroups.transition().attr("transform", getGroupPos);

  // exiting:
  dataGroups.exit().transition().attr("transform", getGroupPosEXIT).remove();


}
let dataToShow = data.filter(d=>d.step == 0)
updateGraph(dataToShow)


enterView({
	selector: '.viz1-step2',
	enter: function(el) {
    
		let dataToShow = data.filter(d=>d.step == 1)
    console.log("enter", dataToShow)
    updateGraph(dataToShow)
	},
  exit: function(el) {
    let dataToShow = data.filter(d=>d.step == 0)
    console.log("exit", dataToShow)
    updateGraph(dataToShow)
	},
  offset: 0.2, // enter at middle of viewport
});

enterView({
	selector: '.viz1-step3',
	enter: function(el) {
    
		let dataToShow = data.filter(d=>d.step == 2)
    console.log("enter", dataToShow)
    updateGraph(dataToShow)
	},
  exit: function(el) {
    let dataToShow = data.filter(d=>d.step == 1)
    console.log("exit", dataToShow)
    updateGraph(dataToShow)
	},
  offset: 0.2, // enter at middle of viewport
});

enterView({
	selector: '.viz1-step4',
	enter: function(el) {
    
		let dataToShow = data.filter(d=>d.step == 3)
    console.log("enter", dataToShow)
    updateGraph(dataToShow)
	},
  exit: function(el) {
    let dataToShow = data.filter(d=>d.step == 2)
    console.log("exit", dataToShow)
    updateGraph(dataToShow)
	},
  offset: 0.2, // enter at middle of viewport
});