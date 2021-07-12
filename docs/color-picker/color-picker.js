"use strict";
function hex2rgb(data) {
    var result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
function rgb2hex(rgb) {
    let r = rgb[0], g = rgb[1], b = rgb[2];
    function hexConvert(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return `#${hexConvert(r)}${hexConvert(g)}${hexConvert(b)}`;
}
function randRGB() {
    function rand255() {
        let val = Math.floor(Math.random() * (99));
        return val < 10 ? "0" + val : val.toString();
    }
    return `#${rand255()}${rand255()}${rand255()}`;
}
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
function rgb2hsvsl(rgb) {
    let norm = rgb.map(Number => Number / 255);
    let r = norm[0], g = norm[1], b = norm[2];
    let max = Math.max(...norm);
    let min = Math.min(...norm);
    let range = max - min;
    let mid = min + range / 2;
    let hue = 0;
    if (range != 0) {
        switch (max) {
            case r:
                hue = ((g - b) / range) % 6;
                break;
            case g:
                hue = (b - r) / range + 2;
                break;
            case b:
                hue = (r - g) / range + 4;
                break;
        }
        hue = Math.round(hue * 60);
        if (hue < 0)
            hue += 360;
    }
    let light = mid;
    let satL = range == 0 ? 0 : range / (1 - Math.abs(2 * light - 1));
    satL = +(satL * 100).toFixed(0);
    light = +(light * 100).toFixed(0);
    let val = +(max * 100).toFixed(0);
    let satV = range == 0 ? 0 : range / max;
    satV = +(satV * 100).toFixed(0);
    return [hue, satV, val, satL, light];
}
// https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB
function hsv2rgb(hsv) {
    let norm = hsv.map(Number => Number / 255);
    let hue = norm[0] * 255;
    let saturation = norm[1];
    let value = norm[2];
    let chroma = (1 - Math.abs(2 * value - 1)) * saturation;
    let x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
    let light = value - chroma / 2;
    let r = -1, g = -1, b = -1;
    if (0 <= hue && hue < 60) {
        r = chroma, g = x, b = 0;
    }
    else if (60 <= hue && hue < 120) {
        r = x, g = chroma, b = 0;
    }
    else if (120 <= hue && hue < 180) {
        r = 0, g = chroma, b = x;
    }
    else if (180 <= hue && hue < 240) {
        r = 0, g = x, b = chroma;
    }
    else if (240 <= hue && hue < 300) {
        r = x, g = 0, b = chroma;
    }
    else if (300 <= hue && hue < 360) {
        r = chroma, g = 0, b = x;
    }
    return [Math.round((r + light) * 255), Math.round((g + light) * 255), Math.round((b + light) * 255)];
}
// https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB
function hsl2rgb(hsl) {
    let h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return [r, g, b];
}
// Init elements + listners
const input = document.getElementById("picker");
const hex = document.getElementById("hex");
const rgb_r = document.getElementById("rgb-r");
const rgb_b = document.getElementById("rgb-b");
const rgb_g = document.getElementById("rgb-g");
const hsv_h = document.getElementById("hsv-h");
const hsv_s = document.getElementById("hsv-s");
const hsv_v = document.getElementById("hsv-v");
const hsl_h = document.getElementById("hsl-h");
const hsl_s = document.getElementById("hsl-s");
const hsl_l = document.getElementById("hsl-l");
input.addEventListener("change", function () { update("input"); });
hex.addEventListener("change", function () { update("hex"); });
rgb_r.addEventListener("change", function () { update("rgb"); });
rgb_b.addEventListener("change", function () { update("rgb"); });
rgb_g.addEventListener("change", function () { update("rgb"); });
hsv_h.addEventListener("change", function () { update("hsv"); });
hsv_s.addEventListener("change", function () { update("hsv"); });
hsv_v.addEventListener("change", function () { update("hsv"); });
hsl_h.addEventListener("change", function () { update("hsl"); });
hsl_s.addEventListener("change", function () { update("hsl"); });
hsl_l.addEventListener("change", function () { update("hsl"); });
// Set random color + update
input.value = randRGB();
window.onload = () => { input.dispatchEvent(new InputEvent("change")); };
// update values in "realtime"
let inputFocused = false;
input.onfocus = function () { inputFocused = true; };
input.onblur = function () { inputFocused = false; };
let hexFocused = false;
hex.onfocus = function () { hexFocused = true; };
hex.onblur = function () { hexFocused = false; };
setInterval(function () {
    if (inputFocused)
        update("input");
    if (hexFocused)
        update("hex");
}, 50);
function update(src) {
    let hexVal = "-1";
    let rgb_arr = [-1, -1, -1];
    let hsvsl_arr = [-1, -1, -1, -1, -1];
    switch (src) {
        case "hex":
            hexVal = hex.value;
            rgb_arr = hex2rgb(hexVal);
            hsvsl_arr = rgb2hsvsl(rgb_arr);
            break;
        case "rgb":
            rgb_arr = [parseInt(rgb_r.value), parseInt(rgb_g.value), parseInt(rgb_b.value)];
            hexVal = rgb2hex(rgb_arr);
            hsvsl_arr = rgb2hsvsl(rgb_arr);
            break;
        case "hsv":
            rgb_arr = hsv2rgb([parseInt(hsv_h.value), parseInt(hsv_s.value), parseInt(hsv_v.value)]);
            hexVal = rgb2hex(rgb_arr);
            hsvsl_arr = rgb2hsvsl(rgb_arr);
            break;
        case "hsl":
            rgb_arr = hsl2rgb([parseInt(hsl_h.value), parseInt(hsl_s.value), parseInt(hsl_l.value)]);
            hexVal = rgb2hex(rgb_arr);
            hsvsl_arr = rgb2hsvsl(rgb_arr);
            break;
        default: // input
            hexVal = input.value;
            rgb_arr = hex2rgb(hexVal);
            hsvsl_arr = rgb2hsvsl(rgb_arr);
            break;
    }
    input.value = hexVal;
    hex.value = hexVal;
    rgb_r.value = rgb_arr[0].toString();
    rgb_g.value = rgb_arr[1].toString();
    rgb_b.value = rgb_arr[2].toString();
    hsv_h.value = hsvsl_arr[0].toString();
    hsv_s.value = hsvsl_arr[1].toString();
    hsv_v.value = hsvsl_arr[2].toString();
    hsl_h.value = hsvsl_arr[0].toString();
    hsl_s.value = hsvsl_arr[3].toString();
    hsl_l.value = hsvsl_arr[4].toString();
    document.documentElement.style.setProperty('--outside-bg-color', hex.value);
}
//# sourceMappingURL=color-picker.js.map