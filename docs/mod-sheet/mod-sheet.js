"use strict";
const ROOT = document.documentElement;
const ROWS = document.getElementById('rows');
const COLS = document.getElementById('cols');
const SHEET = document.getElementById('sheet');
const GCD = document.getElementById('gcd');
const SPEED = document.getElementById('speed');
const FADEIN = document.getElementById('fadein');
const FADEOUT = document.getElementById('fadeout');
var tick = -1;
FADEOUT.addEventListener("input", calcFadeOut);
SPEED.addEventListener("input", calcFadeOut);
FADEIN.dispatchEvent(new Event('input'));
FADEOUT.dispatchEvent(new Event('input'));
ROWS.addEventListener('input', this.upd);
COLS.addEventListener('input', this.upd);
this.upd();
function euclids(x, y) {
    if (y === 0) {
        return x;
    }
    else {
        return euclids(y, x % y);
    }
}
function gcd() {
    return euclids(numRows(), numCols());
}
function product() {
    return numRows() * numCols();
}
function getCell(x, y) {
    return (SHEET.children[x + 1].children[y + 1]);
}
function getCellMod(x, y) {
    x += numRows();
    y += numCols();
    // console.log(x, y);
    return getCell(x % numRows(), y % numCols());
}
function getRow(x) {
    return (SHEET.children[x + 1]);
}
function numRows() {
    if (!SHEET.childElementCount) {
        return -1;
    }
    else {
        return SHEET.childElementCount - 1;
    }
}
function numCols() {
    if (!SHEET.childElementCount) {
        return 0;
    }
    else {
        return SHEET.firstElementChild?.childElementCount - 1;
    }
}
function upd() {
    let old_r = numRows();
    let old_c = numCols();
    let new_r = parseInt(ROWS.value);
    let new_c = parseInt(COLS.value);
    let dr = new_r - old_r;
    let dc = new_c - old_c;
    if (dr) {
        updRows(dr);
    }
    if (dc) {
        updCols(dc);
    }
    Array.from(SHEET.children).forEach(row => {
        Array.from(row.children).forEach(cell => {
            cell.setAttribute("tick", "");
            cell.classList.remove("fade");
        });
    });
    GCD.value = String(gcd());
    let tock = tick;
    tick = 0;
    getCellMod(tock - 2, tock - 2).classList.remove("fade");
    getCellMod(tock - 1, tock - 1).classList.remove("fade");
    getCellMod(tock, tock).classList.remove("fade");
    ROOT.style.setProperty('--product', String(Math.max(numCols(), numRows()) ** 2));
    // ROOT.style.setProperty('--fade-out', 0)
    // todo add class that has instant transition time and default bg/hue
    FADEOUT.dispatchEvent(new Event('input'));
    // ROOT.style.setProperty('--product', product());
}
function updRows(dr) {
    for (let _ = 0; _ < Math.abs(dr); _++) {
        if (dr > 0) {
            let newRow = document.createElement("div");
            for (let i = 0; i <= numCols(); i++) {
                newRow.appendChild(document.createElement("span"));
            }
            SHEET.appendChild(newRow);
        }
        else {
            SHEET.firstElementChild?.remove();
        }
    }
}
function updCols(dc) {
    Array.from(SHEET.children).forEach(row => {
        for (let _ = 0; _ < Math.abs(dc); _++) {
            if (dc > 0) {
                let newCell = document.createElement("span");
                row.appendChild(newCell);
            }
            else {
                row.firstElementChild?.remove();
            }
        }
    });
}
// should be proportional to number of cells traversed
function calcFadeOut() {
    let val = parseInt(SPEED.value) * product() / gcd() / 25;
    FADEOUT.value = String(val);
    ROOT.style.setProperty('--fade-out', val + 'ms');
}
function loop() {
    setTimeout(function () {
        tick = tick % product();
        // console.log(tick);
        getCellMod(tick, tick).classList.add("fade");
        getCellMod(tick, tick).setAttribute('tick', String(tick));
        getCellMod(tick - 1, tick - 1).classList.remove("fade");
        // getCellMod(tick - 1, tick - 1).innerHTML = ""
        tick++;
        loop();
    }, parseInt(SPEED.value));
}
loop();
//# sourceMappingURL=mod-sheet.js.map