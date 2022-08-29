const base = <HTMLDivElement>document.getElementById("serpinski-triangle")
const res = <HTMLInputElement>document.getElementById("res")


res.value = getSavedValue("res")

//Save the value function - save it to localStorage as (ID, VALUE)
function saveValue(e: HTMLInputElement) {
    var id = e.id;  // get the sender's id to save it .
    var val = e.value; // get the value.
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
}

//get the saved value function - return the value of "v" from localStorage.
function getSavedValue(v: string): string {
    if (!localStorage.getItem(v)) {
        return "4"
    } else {
        return localStorage.getItem(v)!
    }
}

var depth = parseInt(res.value)

for (let i = 0; i < depth; i++) {
    let newparent = document.createElement('div')
    let copy = base.firstChild!.cloneNode(true)

    for (let index = 0; index < 3; index++) {
        newparent.appendChild(copy.cloneNode(true))
    }
    base.firstChild!.replaceWith(newparent)
}

res.focus()
res.addEventListener("input", (e) => { saveValue(res); window.location.reload() })