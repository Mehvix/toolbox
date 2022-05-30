"use strict";
// const W = document.getElementsByClassName("nav")[0].clientWidth;
const W = 470;
const H = W;
const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 1;
var y = 1;
var z = 1;
var a = 10;
var b = 28;
var c = 8 / 3;
var speed = 100;
var zoom = 7;
const dt = 0.01;
function draw() {
    ctx.fillRect(0, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(prjX(), prjY());
    var i = speed;
    while (i--) {
        var newx = x + dt * a * (y - x), newy = y + dt * (x * (b - z) - y), newz = z + dt * (x * y - c * z);
        x = newx;
        y = newy;
        z = newz;
        ctx.lineTo(prjX(), prjY());
    }
    ctx.stroke();
    requestAnimationFrame(draw);
}
var prjX = function () {
    return W / 2 + x * zoom;
};
var prjY = function () {
    return H / 2 + y * zoom;
};
function circ(val) {
    val = (Math.PI * val) / 180;
    return [Math.sin(val), Math.cos(val)];
}
function linear(val) {
    val = val / 90;
    return [0 + val, 1 - val];
}
function interp(val) {
    return circ(val);
}
function updStyle(val) {
    ctx.fillStyle = `rgba(255,255,255,${val})`;
}
function xy() {
    prjX = function () { return W / 2 + x * zoom; };
    prjY = function () { return H / 2 + y * zoom; };
    clear();
}
function xz() {
    prjX = function () { return W / 2 + x * zoom; };
    prjY = function () { return H / 2 + (z - b) * zoom; };
    clear();
}
function yz() {
    prjX = function () { return W / 2 + y * zoom; };
    prjY = function () { return H / 2 + (z - b) * zoom; };
    clear();
}
function clear() {
    ctx.clearRect(0, 0, W, H);
}
updStyle(.33);
draw();
//# sourceMappingURL=lorenz.js.map