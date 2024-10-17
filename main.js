import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import Picker from 'vanilla-picker';

function toRgbStr(rgb) {
  const {r,g,b} = rgb;
  return `rgb(${r}, ${g}, ${b})`
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function recur(num, sm) {
  if(num + sm > 255) {
    return recur(0, num + sm - 255)
  }
  return num + sm
}
function variant(hex, vr, only = false) {
  const between = 255 / vr
  const {r,g,b} = hexToRgb(hex);
  const vars = []

  if( only ) {
    let myrgb
    
    for(var i = 0; i < vr; i++) {
    
      switch (only) {
        case "r":
          myrgb = {r: r + between * i,g,b}
          break;
        case "g":
          myrgb = {r,g:g + between * i,b}
          break
        case "b":
          myrgb = {r,g,b: b+between * i}
          break
        default:
          break;
      }
      vars.push(toRgbStr(myrgb))
    }

    return vars
    
  }
  
  for(var i = 0; i < vr; i++) {
    
    const myrgb = {
      r: r + between * i,
      g: g + between * i,
      b: b + between * i,
      
    }
    vars.push(toRgbStr(myrgb))
  }

  return vars
}
const cpicker = document.querySelector('#cpicker')
const box = document.querySelector(".box")
const applyBtn = document.querySelector("#apply-button")
const resetBtn = document.querySelector("#reset-button")


 var picker = new Picker(cpicker);

    // You can do what you want with the chosen color using two callbacks: onChange and onDone.
    picker.onChange = function(color) {
        picker.style.background = color.rgbaString;
        cpicker.setAttribute('data-color', color.hex)
      
    };
applyBtn.addEventListener('click', e => {
 const value = cpicker.getAttribute("data-color")
 const vrs = document.querySelector("#variant")
 const colorSelect = document.querySelector("#color-select")
 const colorVariation = document.querySelector("#color-variation")
 console.log(colorVariation)
 let colors = variant(value, vrs.value)
 if(colorVariation.checked){
  colors = variant(value, vrs.value, colorSelect.value)
 }
 box.innerHTML = ""
 for(var i = 0; i < vrs.value; i++) {
  
    const node = document.createElement("div")
    node.style.backgroundColor = colors[i]
    box.appendChild(node)
  };
})

resetBtn.addEventListener("click", e => {
  const colors = ["red", "green", "blue"]
  box.innerHTML = ""
  for(var i = 0; i < 3; i++) {
    const node = document.createElement("div")
    node.style.backgroundColor = colors[i]
    box.appendChild(node)
  }
})



