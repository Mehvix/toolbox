const RES = 15;
const DOT = RES / 4;
const surface = <HTMLCanvasElement>document.getElementById("surface");
surface.width = window.innerWidth; surface.height = window.innerHeight;
var ctx = <CanvasRenderingContext2D>surface.getContext("2d");
var nodes: number[][] = [[]];
var i = -1;

function grid(i: number): number {
    return RES * Math.round(i / RES);
}

surface.onclick = function (e) {
    nodes[++i] = [grid(e.x), grid(e.y)];

    ctx.beginPath();
    for (var j = 0; j <= i; j++) {
        ctx.moveTo(nodes[j][0], nodes[j][1]);
        ctx.lineTo(nodes[i][0], nodes[i][1]);
        // drawCircle(nodes[i][0], nodes[i][1], "gray");
    }
    ctx.stroke();
};

function drawCircle(x: number, y: number, fill: string) {
    ctx.beginPath();
    ctx.arc(x, y, DOT, 0, 2 * Math.PI, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
}

document.onkeydown = (e) => {
    let k: string = e.key.toLowerCase();
    if (k == "p" || k == "q") {
        if (i >= 0) {
            if (k == "p") {
                var n: number[] = nodes[i];
                drawCircle(n[0], n[1], "blue");
                nodes = nodes.slice(0, i);
            } else {
                var n: number[] = nodes[0];
                drawCircle(n[0], n[1], "red");
                nodes = nodes.slice(1, i + 1);
            }
            i--;
        }
    } else {
        if (k == "r") {
            ctx.clearRect(0, 0, surface.width, surface.height);
        } else if (k == "enter") {
            if (!document.fullscreenElement) {
                surface.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        } else {
            nodes.forEach((el) => {
                drawCircle(el[0], el[1], "gray");
            });
        }
        nodes = [];
        i = -1;
    }
};
