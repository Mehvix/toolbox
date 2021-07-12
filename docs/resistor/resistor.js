"use strict";
class Band {
    num;
    input;
    tr;
    span;
    value;
    constructor(num) {
        this.num = num;
        this.input = document.getElementById(`band${num}`);
        this.input.options.selectedIndex = Math.floor(Math.random() * (this.input.options.length - 1)); // select random color
        this.tr = this.input.parentElement.parentElement;
        this.span = this.tr.lastElementChild.firstElementChild;
        this.value = -1;
        this.updateValue();
        setColor(this.span, this.getColor());
        this.input.addEventListener("change", () => {
            setColor(this.span, this.getColor());
            this.updateValue();
            updateResults();
        });
    }
    getColor() {
        return this.input.value;
    }
    updateValue() {
        switch (this.getColor().toLowerCase()) {
            case "black":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 0;
                }
                else {
                    this.value = 1;
                }
                break;
            case "brown":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 1;
                }
                else if (this.num == 4) {
                    this.value = 10;
                }
                else if (this.num == 5) {
                    this.value = 1;
                }
                else {
                    this.value = 100;
                }
                break;
            case "red":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 2;
                }
                else if (this.num == 4) {
                    this.value = 100;
                }
                else if (this.num == 5) {
                    this.value = 2;
                }
                else {
                    this.value = 50;
                }
                break;
            case "orange":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 3;
                }
                else if (this.num == 4) {
                    this.value = 1000;
                }
                else {
                    this.value = 15;
                } // 6
                break;
            case "yellow":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 4;
                }
                else if (this.num == 4) {
                    this.value = 10000;
                }
                else {
                    this.value = 25;
                } // 6
                break;
            case "green":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 5;
                }
                else if (this.num == 4) {
                    this.value = 100000;
                }
                else {
                    this.value = 0.5;
                }
                break;
            case "blue":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 6;
                }
                else if (this.num == 4) {
                    this.value = 1000000;
                }
                else {
                    this.value = 0.25;
                }
                break;
            case "violet":
                if (this.num == 1 || this.num == 2 || this.num == 3) {
                    this.value = 7;
                }
                else if (this.num == 4) {
                    this.value = 10000000;
                }
                else {
                    this.value = 0.01;
                }
                break;
            case "gray":
                this.value = 8;
                break;
            case "white":
                this.value = 9;
                break;
            case "silver":
                if (this.num == 4) {
                    this.value = 0.01;
                }
                else {
                    this.value = 10;
                }
                break;
            case "gold":
                if (this.num == 4) {
                    this.value = 0.1;
                }
                else {
                    this.value = 5;
                }
                break;
        }
    }
}
// Init Bands
const band1 = new Band(1);
const band2 = new Band(2);
const band3 = new Band(3);
const band4 = new Band(4);
const band5 = new Band(5);
const band6 = new Band(6);
// Init HTML references
const bands = document.getElementById("bands");
// Set bands to six by default
bands.value = "6";
// Update number of bands on load
window.onload = () => { bands.dispatchEvent(new InputEvent("input", { 'data': bands.value })), updateResults(); };
// Update number of bands when number changed
bands.addEventListener("input", (ev) => {
    function showElement(el) { el.removeAttribute("style"); }
    function hideElement(el) { el.setAttribute("style", "display:none"); }
    let numBands = parseInt(bands.value); // for some reason event doesn't have input data so we get it this way
    if (numBands == 6) {
        showElement(band3.tr);
        showElement(band6.tr);
    }
    else if (numBands == 5) {
        showElement(band3.tr);
        hideElement(band6.tr);
    }
    else if (numBands == 4) {
        hideElement(band3.tr);
        hideElement(band6.tr);
    }
    updateResults();
});
function setColor(el, color) {
    let val;
    switch (color.toLowerCase()) {
        case "pink":
            val = "#ff69b4";
            break;
        case "silver":
            val = "#c0c0c0";
            break;
        case "gold":
            val = "#cfb53b";
            break;
        case "black":
            val = "#000000";
            break;
        case "brown":
            val = "#964b00";
            break;
        case "red":
            val = "#ff0000";
            break;
        case "orange":
            val = "#ffa500";
            break;
        case "yellow":
            val = "#ffff00";
            break;
        case "green":
            val = "#9acd32";
            break;
        case "blue":
            val = "#6495ed";
            break;
        case "violet":
            val = "#9400d3";
            break;
        case "gray":
            val = "#a0a0a0";
            break;
        case "white":
            val = "#ffffff";
            break;
        default: val = "#00ff9d";
    }
    el.setAttribute("style", `background-color: ${val}`);
}
function updateResults() {
    function setValue(el, data) { el.innerHTML = data; }
    const bandCount = document.getElementById("band-count");
    // const resistanceDigits = <HTMLSpanElement>document.getElementById("resistance-digits")
    const resistance = document.getElementById("resistance");
    const tolerance = document.getElementById("tolerance");
    const toleranceValue = document.getElementById("tolerance-value");
    const temp = document.getElementById("temp");
    const resist = bands.value == "4" ? (band1.value * 10 + band2.value) * band4.value : (band1.value * 100 + band2.value * 10 + band3.value) * band4.value;
    setValue(bandCount, `${parseInt(bands.value)}`);
    // setValue(resistanceDigits, bands.value == "4" ? "2" : "3")
    setValue(resistance, `${Math.round(resist * 100000) / 100000}`); // round to five places
    setValue(tolerance, `${band5.value}`);
    setValue(toleranceValue, `${Math.round((band5.value * resist * 0.01) * 100000) / 100000}`);
    setValue(temp, bands.value == "6" ? ` and a temperature coefficient of <b>${band6.value}</b> ppm.` : ".");
}
//# sourceMappingURL=resistor.js.map