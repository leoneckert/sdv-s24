// I should code this with a different data set 
// that makes more sense as a bar graph

import deaths from './celebrity_deaths.json' assert {type: 'json'};
 
// optional:
// should show a different sort function too.
// from: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
// declare the function 
function shuffle(array){ 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

// make array smaller to work with it:
let deaths_small = deaths.slice(0, 100)
console.log(deaths_small);

// // one bar:
let vizContainer = document.querySelector("#vizContainer");
// let bar = document.createElement("div");
// bar.className = "bar";
// vizContainer.appendChild(bar);

// estimated maxium age:
let max_age = 110;

// for each data point:
for(let i = 0; i < deaths_small.length; i++){
    let datapoint = deaths_small[i];
    let age = datapoint.age;
    let name = datapoint.name;

    console.log(datapoint);

    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = 100*(age/max_age) + "%";
    // console.log(age/max_age)
    let label = document.createElement("p");
    label.className = "label";
    label.innerText = name;
    bar.appendChild(label);
    
    vizContainer.appendChild(bar);

}


