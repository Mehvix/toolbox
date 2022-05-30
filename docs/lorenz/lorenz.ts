// const W = document.getElementsByClassName("nav")[0].clientWidth;
const W = 470
const H = W;
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

var x: number = 1;
var y: number = 1;
var z: number = 1;

var a: number = 10;
var b: number = 28;
var c: number = 8 / 3;

var speed: number = 100;
var zoom: number = 7;

const dt: number = 0.01;

function draw() {
    ctx.fillRect(0, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(prjX(), prjY());

    var i = speed;
    while (i--) {
        var newx = x + dt * a * (y - x),
            newy = y + dt * (x * (b - z) - y),
            newz = z + dt * (x * y - c * z);
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

function circ(val: number): number[] {
    val = (Math.PI * val) / 180;
    return [Math.sin(val), Math.cos(val)];
}

function linear(val: number): number[] {
    val = val / 90;
    return [0 + val, 1 - val];
}

function interp(val: number): number[] {
    return circ(val);
}

function updStyle(val: number) {
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

updStyle(.33)
draw();
