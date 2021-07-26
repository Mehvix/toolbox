// converts float (f) to the nearest fraction with denominator (d); returns numerator
function float2frac(d: number, f: number): number {
    for (let i = 1; i < d; i++) {
        let val = i / d;
        if (f > val) {
            let dist1 = f - val;
            let dist2 = dist1 - 1 / d;
            return Math.min(dist1, dist2);
        }
        return 0;
    }
    return 100;
}

document.addEventListener("DOMContentLoaded", function () {
    // todo agh this doesn't work with other variants. simulate hands to get EV rank?
    function updateSelects(): void {
        let max = Math.round((parseFloat(slider.value) * permus) / 100);
        let hands: string = "";

        for (let i = 0; i < max; i++) {
            let id = EV[i];
            let el = document.getElementById(id) as HTMLTableCellElement;
            el.classList.add("selected");
            hands += EV[i] + ", ";
        }

        document.getElementById("hands")!.innerText = hands.slice(0, -2) + " ";

        for (let i = max; i < permus; i++) {
            let id = EV[i];
            let el = document.getElementById(id) as HTMLTableCellElement;
            el.classList.remove("selected");
        }
    }

    // Sets slider and number input to same value
    function updateNum(caller: string): void {
        // slider holds true value (no rounding)
        switch (caller) {
            case "num":
                slider.value = float2frac(permus, parseFloat(num.value)).toString();
                break;
            case "slider":
                num.value = parseFloat(slider.value).toFixed(2);
                break;
        }

        updateSelects();
    }

    // Updates page based on variant selected
    function variantUpdate(): void {
        switch (variant.value) {
            case "texas":
                permus = 13 * 13;
                variantCSS.innerHTML = "";
                break;
            case "short":
                permus = 9 * 9;
                variantCSS.innerHTML = ".small{ display: none }";
                break;
        }
        slider.step = (100 / permus).toString();
        updateNum("slider");
    }

    // Table init
    const table = document.getElementById("range_table")!;
    table.innerHTML += data;

    // Slider + number sync
    const slider = document.getElementById("slider") as HTMLInputElement;
    const num = document.getElementById("num") as HTMLInputElement;
    slider.addEventListener("change", () => updateNum("slider"));
    num.addEventListener("change", () => updateNum("num"));
    num.addEventListener("blur", () => updateNum("slider"));
    updateNum("slider");

    // Variant adjusting code
    const variant = <HTMLSelectElement>document.getElementById("variant");
    const variantCSS = <HTMLStyleElement>document.getElementById("variantCSS");
    variant.addEventListener("change", () => variantUpdate());
    variantUpdate();
    updateNum("slider");
});

// variables
var permus: number;

// https://www.tightpoker.com/hands/ev_position.html
const EV = [
    "AA",
    "KK",
    "QQ",
    "JJ",
    "AKs",
    "AQs",
    "TT",
    "AKo",
    "AJs",
    "KQs",
    "99",
    "ATs",
    "AQo",
    "KJs",
    "88",
    "QJs",
    "KTs",
    "A9s",
    "AJo",
    "QTs",
    "KQo",
    "77",
    "JTs",
    "A8s",
    "K9s",
    "ATo",
    "A5s",
    "A7s",
    "KJo",
    "66",
    "T9s",
    "A4s",
    "Q9s",
    "J9s",
    "QJo",
    "A6s",
    "55",
    "A3s",
    "K8s",
    "KTo",
    "98s",
    "T8s",
    "K7s",
    "A2s",
    "87s",
    "QTo",
    "Q8s",
    "44",
    "A9o",
    "J8s",
    "76s",
    "JTo",
    "97s",
    "K6s",
    "K5s",
    "K4s",
    "T7s",
    "Q7s",
    "K9o",
    "65s",
    "T9o",
    "86s",
    "A8o",
    "J7s",
    "33",
    "54s",
    "Q6s",
    "K3s",
    "Q9o",
    "75s",
    "22",
    "J9o",
    "64s",
    "Q5s",
    "K2s",
    "96s",
    "Q3s",
    "J8o",
    "98o",
    "T8o",
    "97o",
    "A7o",
    "T7o",
    "Q4s",
    "Q8o",
    "J5s",
    "T6o",
    "75o",
    "J4s",
    "74s",
    "K8o",
    "86o",
    "53s",
    "K7o",
    "63s",
    "J6s",
    "85o",
    "T6s",
    "76o",
    "A6o",
    "T2o",
    "95s",
    "84o",
    "62o",
    "T5s",
    "95o",
    "A5o",
    "Q7o",
    "T5o",
    "87o",
    "83o",
    "65o",
    "Q2s",
    "94o",
    "74o",
    "54o",
    "A4o",
    "T4o",
    "82o",
    "64o",
    "42o",
    "J7o",
    "93o",
    "85s",
    "73o",
    "53o",
    "T3o",
    "63o",
    "K6o",
    "J6o",
    "96o",
    "92o",
    "72o",
    "52o",
    "Q4o",
    "K5o",
    "J5o",
    "43s",
    "Q3o",
    "43o",
    "K4o",
    "J4o",
    "T4s",
    "Q6o",
    "Q2o",
    "J3s",
    "J3o",
    "T3s",
    "A3o",
    "Q5o",
    "J2o",
    "84s",
    "82s",
    "42s",
    "93s",
    "73s",
    "K3o",
    "J2s",
    "92s",
    "52s",
    "K2o",
    "T2s",
    "62s",
    "32o",
    "A2o",
    "83s",
    "94s",
    "72s",
    "32s",
];
const data = `<table id="table" class="range_table">
<tbody>
    <tr>
        <td id="AA" class="pair">AA</td>
        <td id="AKs" class="suited">AKs</td>
        <td id="AQs" class="suited">AQs</td>
        <td id="AJs" class="suited">AJs</td>
        <td id="ATs" class="suited">ATs</td>
        <td id="A9s" class="suited">A9s</td>
        <td id="A8s" class="suited">A8s</td>
        <td id="A7s" class="suited">A7s</td>
        <td id="A6s" class="suited">A6s</td>
        <td id="A5s" class="small suited">A5s</td>
        <td id="A4s" class="small small suited">A4s</td>
        <td id="A3s" class="small suited">A3s</td>
        <td id="A2s" class="small suited">A2s</td>
    </tr>
    <tr>
        <td id="AKo" class="offsuit">AKo</td>
        <td id="KK" class="pair">KK</td>
        <td id="KQs" class="suited">KQs</td>
        <td id="KJs" class="suited">KJs</td>
        <td id="KTs" class="suited">KTs</td>
        <td id="K9s" class="suited">K9s</td>
        <td id="K8s" class="suited">K8s</td>
        <td id="K7s" class="suited">K7s</td>
        <td id="K6s" class="suited">K6s</td>
        <td id="K5s" class="small suited">K5s</td>
        <td id="K4s" class="small suited">K4s</td>
        <td id="K3s" class="small suited">K3s</td>
        <td id="K2s" class="small suited">K2s</td>
    </tr>
    <tr>
        <td id="AQo" class="offsuit">AQo</td>
        <td id="KQo" class="offsuit">KQo</td>
        <td id="QQ" class="pair">QQ</td>
        <td id="QJs" class="suited">QJs</td>
        <td id="QTs" class="suited">QTs</td>
        <td id="Q9s" class="suited">Q9s</td>
        <td id="Q8s" class="suited">Q8s</td>
        <td id="Q7s" class="suited">Q7s</td>
        <td id="Q6s" class="suited">Q6s</td>
        <td id="Q5s" class="small suited">Q5s</td>
        <td id="Q4s" class="small suited">Q4s</td>
        <td id="Q3s" class="small suited">Q3s</td>
        <td id="Q2s" class="small suited">Q2s</td>
    </tr>
    <tr>
        <td id="AJo" class="offsuit">AJo</td>
        <td id="KJo" class="offsuit">KJo</td>
        <td id="QJo" class="offsuit">QJo</td>
        <td id="JJ" class="pair">JJ</td>
        <td id="JTs" class="suited">JTs</td>
        <td id="J9s" class="suited">J9s</td>
        <td id="J8s" class="suited">J8s</td>
        <td id="J7s" class="suited">J7s</td>
        <td id="J6s" class="suited">J6s</td>
        <td id="J5s" class="small suited">J5s</td>
        <td id="J4s" class="small suited">J4s</td>
        <td id="J3s" class="small suited">J3s</td>
        <td id="J2s" class="small suited">J2s</td>
    </tr>
    <tr>
        <td id="ATo" class="offsuit">ATo</td>
        <td id="KTo" class="offsuit">KTo</td>
        <td id="QTo" class="offsuit">QTo</td>
        <td id="JTo" class="offsuit">JTo</td>
        <td id="TT" class="pair">TT</td>
        <td id="T9s" class="suited">T9s</td>
        <td id="T8s" class="suited">T8s</td>
        <td id="T7s" class="suited">T7s</td>
        <td id="T6s" class="suited">T6s</td>
        <td id="T5s" class="small suited">T5s</td>
        <td id="T4s" class="small suited">T4s</td>
        <td id="T3s" class="small suited">T3s</td>
        <td id="T2s" class="small suited">T2s</td>
    </tr>
    <tr>
        <td id="A9o" class="offsuit">A9o</td>
        <td id="K9o" class="offsuit">K9o</td>
        <td id="Q9o" class="offsuit">Q9o</td>
        <td id="J9o" class="offsuit">J9o</td>
        <td id="T9o" class="offsuit">T9o</td>
        <td id="99" class="pair">99</td>
        <td id="98s" class="suited">98s</td>
        <td id="97s" class="suited">97s</td>
        <td id="96s" class="suited">96s</td>
        <td id="95s" class="small suited">95s</td>
        <td id="94s" class="small suited">94s</td>
        <td id="93s" class="small suited">93s</td>
        <td id="92s" class="small suited">92s</td>
    </tr>
    <tr>
        <td id="A8o" class="offsuit">A8o</td>
        <td id="K8o" class="offsuit">K8o</td>
        <td id="Q8o" class="offsuit">Q8o</td>
        <td id="J8o" class="offsuit">J8o</td>
        <td id="T8o" class="offsuit">T8o</td>
        <td id="98o" class="offsuit">98o</td>
        <td id="88" class="pair">88</td>
        <td id="87s" class="suited">87s</td>
        <td id="86s" class="suited">86s</td>
        <td id="85s" class="small suited">85s</td>
        <td id="84s" class="small suited">84s</td>
        <td id="83s" class="small suited">83s</td>
        <td id="82s" class="small suited">82s</td>
    </tr>
    <tr>
        <td id="A7o" class="offsuit">A7o</td>
        <td id="K7o" class="offsuit">K7o</td>
        <td id="Q7o" class="offsuit">Q7o</td>
        <td id="J7o" class="offsuit">J7o</td>
        <td id="T7o" class="offsuit">T7o</td>
        <td id="97o" class="offsuit">97o</td>
        <td id="87o" class="offsuit">87o</td>
        <td id="77" class="pair">77</td>
        <td id="76s" class="suited">76s</td>
        <td id="75s" class="small suited">75s</td>
        <td id="74s" class="small suited">74s</td>
        <td id="73s" class="small suited">73s</td>
        <td id="72s" class="small suited">72s</td>
    </tr>
    <tr>
        <td id="A6o" class="offsuit">A6o</td>
        <td id="K6o" class="offsuit">K6o</td>
        <td id="Q6o" class="offsuit">Q6o</td>
        <td id="J6o" class="offsuit">J6o</td>
        <td id="T6o" class="offsuit">T6o</td>
        <td id="96o" class="offsuit">96o</td>
        <td id="86o" class="offsuit">86o</td>
        <td id="76o" class="offsuit">76o</td>
        <td id="66" class="pair">66</td>
        <td id="65s" class="small suited">65s</td>
        <td id="64s" class="small suited">64s</td>
        <td id="63s" class="small suited">63s</td>
        <td id="62s" class="small suited">62s</td>
    </tr>
    <tr>
        <td id="A5o" class="small offsuit">A5o</td>
        <td id="K5o" class="small offsuit">K5o</td>
        <td id="Q5o" class="small offsuit">Q5o</td>
        <td id="J5o" class="small offsuit">J5o</td>
        <td id="T5o" class="small offsuit">T5o</td>
        <td id="95o" class="small offsuit">95o</td>
        <td id="85o" class="small offsuit">85o</td>
        <td id="75o" class="small offsuit">75o</td>
        <td id="65o" class="small offsuit">65o</td>
        <td id="55" class="small pair">55</td>
        <td id="54s" class="small suited">54s</td>
        <td id="53s" class="small suited">53s</td>
        <td id="52s" class="small suited">52s</td>
    </tr>
    <tr>
        <td id="A4o" class="small offsuit">A4o</td>
        <td id="K4o" class="small offsuit">K4o</td>
        <td id="Q4o" class="small offsuit">Q4o</td>
        <td id="J4o" class="small offsuit">J4o</td>
        <td id="T4o" class="small offsuit">T4o</td>
        <td id="94o" class="small offsuit">94o</td>
        <td id="84o" class="small offsuit">84o</td>
        <td id="74o" class="small offsuit">74o</td>
        <td id="64o" class="small offsuit">64o</td>
        <td id="54o" class="small offsuit">54o</td>
        <td id="44" class="small pair">44</td>
        <td id="43s" class="small suited">43s</td>
        <td id="42s" class="small suited">42s</td>
    </tr>
    <tr>
        <td id="A3o" class="small offsuit">A3o</td>
        <td id="K3o" class="small offsuit">K3o</td>
        <td id="Q3o" class="small offsuit">Q3o</td>
        <td id="J3o" class="small offsuit">J3o</td>
        <td id="T3o" class="small offsuit">T3o</td>
        <td id="93o" class="small offsuit">93o</td>
        <td id="83o" class="small offsuit">83o</td>
        <td id="73o" class="small offsuit">73o</td>
        <td id="63o" class="small offsuit">63o</td>
        <td id="53o" class="small offsuit">53o</td>
        <td id="43o" class="small offsuit">43o</td>
        <td id="33" class="small pair">33</td>
        <td id="32s" class="small suited">32s</td>
    </tr>
    <tr>
        <td id="A2o" class="small offsuit">A2o</td>
        <td id="K2o" class="small offsuit">K2o</td>
        <td id="Q2o" class="small offsuit">Q2o</td>
        <td id="J2o" class="small offsuit">J2o</td>
        <td id="T2o" class="small offsuit">T2o</td>
        <td id="92o" class="small offsuit">92o</td>
        <td id="82o" class="small offsuit">82o</td>
        <td id="72o" class="small offsuit">72o</td>
        <td id="62o" class="small offsuit">62o</td>
        <td id="52o" class="small offsuit">52o</td>
        <td id="42o" class="small offsuit">42o</td>
        <td id="32o" class="small offsuit">32o</td>
        <td id="22" class="small pair">22</td>
    </tr>
</tbody>
</table>`;
