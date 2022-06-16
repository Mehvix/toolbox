"use strict";
const fin = document.getElementById("autolink");
const out = document.getElementById("autout");
fin.addEventListener("input", (e) => {
    let val = e.target.value;
    if (val == "") {
        out.textContent = " ";
    }
    else {
        let reg = RegExp("(src=|/ical/|cid=)(.*?)(/|&|$)").exec(val);
        if (reg) {
            out.textContent = "https://calendar.google.com/calendar/ical/" + decodeURIComponent(reg[2]) + "/public/basic.ics";
        }
        else {
            out.textContent = "Invalid URL";
        }
    }
}, false);
fin.dispatchEvent(new InputEvent("input"));
//# sourceMappingURL=ical-generator.js.map