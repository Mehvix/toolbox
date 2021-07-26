"use strict";
document.addEventListener("DOMContentLoaded", function (event) {
    function updateSizes() {
        while (sizes.options.length != 0)
            sizes.options.remove(0);
        let options = [];
        if (region.value == "Imperial") {
            // for (let i = 0; i < impOptions.length; i++) sizes.options.add(impOptions.item(i)!, null)
            options.push("<option>#0</option>");
            options.push("<option>#1</option>");
            options.push("<option>#2</option>");
            options.push("<option>#3</option>");
            options.push("<option>#4</option>");
            options.push("<option>#5</option>");
            options.push("<option>#6</option>");
            options.push("<option>#8</option>");
            options.push("<option>#10</option>");
            options.push("<option>#12</option>");
            options.push("<option>1/4</option>");
            options.push("<option>5/16</option>");
            options.push("<option>3/8</option>");
            options.push("<option>7/16</option>");
            options.push("<option>1/2</option>");
            options.push("<option>9/16</option>");
            options.push("<option>5/8</option>");
            options.push("<option>11/16</option>");
            options.push("<option>3/4</option>");
            options.push("<option>13/16</option>");
            options.push("<option>7/8</option>");
            options.push("<option>15/16</option>");
            options.push("<option>1</option>");
        }
        else {
            // for (let i = 0; i < metOptions.length; i++) sizes.options.add(metOptions.item(i)!, null)
            options.push("<option>M2</option>");
            options.push("<option>M2.5</option>");
            options.push("<option>M3</option>");
            options.push("<option>M4</option>");
            options.push("<option>M5</option>");
            options.push("<option>M6</option>");
            options.push("<option>M8</option>");
            options.push("<option>M10</option>");
            options.push("<option>M12</option>");
            options.push("<option>M14</option>");
            options.push("<option>M16</option>");
        }
        sizes.innerHTML = options.join();
    }
    function updateResult() {
        function updateSpan(span, data) {
            span.innerHTML = data;
        }
        let clearanceClose = "[todo]";
        let clearanceFree = "[todo]";
        let tap50 = "[todo]";
        let tap75 = "[todo]";
        if (region.value == "Imperial") {
            switch (sizes.value) {
                case "#0":
                    clearanceClose = "52 (0.0635)";
                    clearanceFree = "50 (0.0700)";
                    tap75 = "55	(0.0520)";
                    tap50 = "3/64 (0.0469)";
                    break;
                case "#1":
                    clearanceClose = "48 (0.0760)";
                    clearanceFree = "46 (0.0810)";
                    break;
                case "#2":
                    clearanceClose = "43 (0.0890)";
                    clearanceFree = "41 (0.0960)";
                    break;
                case "#3":
                    clearanceClose = "37 (0.1040)";
                    clearanceFree = "35	(0.1100)";
                    break;
                case "#4":
                    clearanceClose = "32 (0.1160)";
                    clearanceFree = "30 (0.1285)";
                    break;
                case "#5":
                    clearanceClose = "30 (0.1285)";
                    clearanceFree = "29 (0.1360)";
                    break;
                case "#6":
                    clearanceClose = "27 (0.1440)";
                    clearanceFree = "25 (0.1495)";
                    break;
                case "#8":
                    clearanceClose = "18 (0.1695)";
                    clearanceFree = "16 (0.1770)";
                    break;
                case "#10":
                    clearanceClose = "9 (0.1960)";
                    clearanceFree = "7 (0.2010)";
                    break;
                case "#12":
                    clearanceClose = "2 (0.2210)";
                    clearanceFree = "1 (0.2280)";
                    break;
                case "1/4":
                    clearanceClose = "F (0.2570)";
                    clearanceFree = "H (0.2660)";
                    break;
                case "5/16":
                    clearanceClose = "P (0.3230)";
                    clearanceFree = "Q (0.3320)";
                    break;
                case "3/8":
                    clearanceClose = "W (0.3860)";
                    clearanceFree = "X (0.3970)";
                    break;
                case "7/16":
                    clearanceClose = "29/64 (0.4531)";
                    clearanceFree = "15/32 (0..4687)";
                    break;
                case "1/2":
                    clearanceClose = "33/64 (0.5156)";
                    clearanceFree = "17/32 (0.5312)";
                    break;
                case "9/16":
                    clearanceClose = "37/64 (0.5781)";
                    clearanceFree = "19/32 (0.5938)";
                    break;
                case "5/8":
                    clearanceClose = "41/64 (0.6406)";
                    clearanceFree = "21/32 (0.6562)";
                    break;
                case "11/16":
                    clearanceClose = "45/64 (0.7031)";
                    clearanceFree = "23/32 (0.7188)";
                    break;
                case "3/4":
                    clearanceClose = "49/64 (0.7656)";
                    clearanceFree = "25/32 (0.7812)";
                    break;
                case "13/16":
                    clearanceClose = "53/64 (0.8281)";
                    clearanceFree = "27/32 (0.8438)";
                    break;
                case "7/8":
                    clearanceClose = "57/64 (0.8906)";
                    clearanceFree = "29/32 (0.9062)";
                    break;
                case "15/16":
                    clearanceClose = "61/64 (0.9531)";
                    clearanceFree = "31/32 (0.9688)";
                    break;
                case "1":
                    clearanceClose = "1-1/64 (1.0156)";
                    clearanceFree = "1-1/32 (1.0313)";
                    break;
            }
        }
        else {
            switch (sizes.value) {
                case "M2":
                case "M2.5":
                case "M3":
                case "M4":
                case "M5":
                case "M6":
                case "M8":
                case "M10":
                case "M12":
                case "M14":
                case "M16":
            }
        }
        updateSpan(neededClearanceClose, clearanceClose);
        updateSpan(neededClearanceFree, clearanceFree);
        updateSpan(neededTap50, tap50);
        updateSpan(neededTap75, tap75);
    }
    // Init HTML consts
    const region = document.getElementById("region");
    const sizes = document.getElementById("sizes");
    const neededClearanceClose = document.getElementById("needed-clearance-close");
    const neededClearanceFree = document.getElementById("needed-clearance-free");
    const neededTap50 = document.getElementById("needed-tap-50");
    const neededTap75 = document.getElementById("needed-tap-75");
    // Update list of sizes when on load + region changed
    updateSizes();
    updateResult();
    region.addEventListener("change", updateSizes);
    sizes.addEventListener("change", updateResult);
});
//# sourceMappingURL=screw-and-drill.js.map