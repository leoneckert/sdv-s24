import data from "./nyc-language-data.json" assert {type: 'json'}

console.log(data);

// we filter out datapoint to end up
// with a smaller subset of her data
let filteredData = data.filter(datapoint=>{
    if(datapoint.World_Region == "Southern Europe"){
        return true // keep the datapoint
    }else{
        return false // discard the datapoint
    }
});

filteredData = filteredData.filter(datapoint=>{
    if(datapoint.Global_Speakers == ""){
        return false
    }else{
        return true
    }
})

console.log(filteredData);

// select the empty div on the page (DOM)
// let vizContainer = document.getElementById("vizContainer");
let vizContainer = document.querySelector("#vizContainer");
// console.log(vizContainer);


// let newDiv = document.createElement("div");
// newDiv.className = "bar";
// vizContainer.appendChild(newDiv);

// find the maximum value of Global_Speakers about all datapoint
let maximum = 0;
filteredData.forEach(datapoint=>{
    // loop over datapoints
    // check if there number is bigger than current 
    // value of "maximum" variable
    if(datapoint.Global_Speakers > maximum){
        // if yes, update the variable's value
        maximum = datapoint.Global_Speakers;
    }
})
console.log("max is:", maximum);

// loop over each data
filteredData.forEach(datapoint=>{
    // for each datapoint
    // make a div with class "bar"
    let newDiv = document.createElement("div");
    newDiv.className = "bar";

    let label = document.createElement("p");
    label.className = "label";
    label.innerText = datapoint.Language;

    // do the math to size the div
    let widthPercentage = datapoint.Global_Speakers/maximum; // 0-1
    widthPercentage = 10 + widthPercentage*80; // 10-90
    // change the size:
    newDiv.style.width = widthPercentage + "%";

    // append label to div:
    newDiv.appendChild(label)
    // append the div to the initially empty div ("#vizWrapper")
    vizContainer.appendChild(newDiv);
})



