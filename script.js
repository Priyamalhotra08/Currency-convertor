const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from-container select");
const  toCurr = document.querySelector(".To-container select");
const msg = document.querySelector(".msg")
 for(let drop of dropdown){
    for( code in countryList){
        let newOption = document.createElement("option");
       newOption.innerText= code;
       newOption.value = code;
      
        if(drop.name === "from" &&  code === "AED"){
           newOption.selected = "selected";
        }
        else if(drop.name === "to" && code=== "INR"){
           newOption.selected = "selected";
        }
        drop.append(newOption);
    }
    drop.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
    })
 }

 let updateFlag = (element) => {
    let curr = element.value;
    let country = countryList[curr];
    let linkSrc = `https://flagsapi.com/${country}/shiny/64.png`;
    let el = element.parentNode.querySelector('img');
    el.src = linkSrc;
 }

 btn.addEventListener("click", async(evt)=>{
   evt.preventDefault();
   let input = document.querySelector(".container input");
   let amt = input.value;
   if (amt === "" || amt < 1){
    amt = 1;
    input.value = "1";
   }
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
   let response = await fetch(URL);
 
   let data = await response.json();
   const rate = data.rates;
   let to = toCurr.value;
   let final = rate[to];
   const finalAmt = amt * final;
   msg.innerText = `${amt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
 })
