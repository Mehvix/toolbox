const ROOT = document.documentElement;

const ROWS = <HTMLInputElement>document.getElementById('rows')!
const COLS = <HTMLInputElement>document.getElementById('cols')!
const SHEET = <HTMLDivElement>document.getElementById('sheet')!
const GCD = <HTMLInputElement>document.getElementById('gcd')!
const SPEED = <HTMLInputElement>document.getElementById('speed')!
const FADEIN = <HTMLInputElement>document.getElementById('fadein')!
const FADEOUT = <HTMLInputElement>document.getElementById('fadeout')!
var tick = -1

FADEOUT.addEventListener("input", calcFadeOut)
SPEED.addEventListener("input", calcFadeOut)
FADEIN.dispatchEvent(new Event('input'))
FADEOUT.dispatchEvent(new Event('input'))

ROWS.addEventListener('input', this.updSheet)
COLS.addEventListener('input', this.updSheet)
this.updSheet()

function euclids(x: number, y: number): number {
    if (y === 0) {
        return x
    } else {
        return euclids(y, x % y)
    }
}

function gcd(): number {
    return euclids(numRows(), numCols())
}

function product(): number {
    return numRows() * numCols()
}

function getCell(x: number, y: number): HTMLSpanElement {
    return <HTMLSpanElement>(SHEET.children[x + 1].children[y + 1])
}

function getCellMod(x: number, y: number): HTMLSpanElement {
    x += numRows()
    y += numCols()
    // console.log(x, y);
    return getCell(x % numRows(), y % numCols())
}

function getRow(x: number): HTMLDivElement {
    return <HTMLDivElement>(SHEET.children[x + 1])
}

function numRows(): number {
    if (!SHEET.childElementCount) {
        return -1
    } else {
        return SHEET.childElementCount - 1
    }
}

function numCols(): number {
    if (!SHEET.childElementCount) {
        return 0
    } else {
        return SHEET.firstElementChild?.childElementCount! - 1
    }
}

function updSheet() {
    let old_r = numRows()
    let old_c = numCols()
    let new_r = parseInt(ROWS.value)
    let new_c = parseInt(COLS.value)
    let dr = new_r - old_r;
    let dc = new_c - old_c;


    if (dr) {
        updRows(dr)
    }
    if (dc) {
        updCols(dc)
    }

    Array.from(SHEET.children).forEach(row => {
        Array.from(row.children).forEach(cell => {
            cell.setAttribute("tick", "")
            cell.classList.remove("fade")
        })
    })

    GCD.value = String(gcd())

    let tock = tick
    tick = 0
    getCellMod(tock - 2, tock - 2).classList.remove("fade")
    getCellMod(tock - 1, tock - 1).classList.remove("fade")
    getCellMod(tock, tock).classList.remove("fade")

    ROOT.style.setProperty('--product', String(Math.max(numCols(), numRows()) ** 2));
    // ROOT.style.setProperty('--fade-out', 0)
    // todo add class that has instant transition time and default bg/hue
    FADEOUT.dispatchEvent(new Event('input'))
    // ROOT.style.setProperty('--product', product());
}

function updRows(dr: number) {
    for (let _ = 0; _ < Math.abs(dr); _++) {
        if (dr > 0) {
            let newRow = document.createElement("div")
            for (let i = 0; i <= numCols(); i++) {
                newRow.appendChild(document.createElement("span"))
            }
            SHEET.appendChild(newRow)
        } else {
            SHEET.firstElementChild?.remove()
        }
    }
}

function updCols(dc: number) {
    Array.from(SHEET.children).forEach(row => {
        for (let _ = 0; _ < Math.abs(dc); _++) {
            if (dc > 0) {
                let newCell = document.createElement("span")
                row.appendChild(newCell)
            } else {
                row.firstElementChild?.remove()
            }
        }
    })
}

// should be proportional to number of cells traversed
function calcFadeOut() {
    let val = parseInt(SPEED.value) * product() / gcd() / 25
    FADEOUT.value = String(val)
    ROOT.style.setProperty('--fade-out', val + 'ms');
}

function loop() {
    setTimeout(function () {
        tick = tick % product()
        // console.log(tick);
        getCellMod(tick, tick).classList.add("fade")
        getCellMod(tick, tick).setAttribute('tick', String(tick))
        getCellMod(tick - 1, tick - 1).classList.remove("fade")
        // getCellMod(tick - 1, tick - 1).innerHTML = ""
        tick++
        loop();
    }, parseInt(SPEED.value));
}
loop();