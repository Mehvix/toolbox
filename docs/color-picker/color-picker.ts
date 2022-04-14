class InputClass {
    input: HTMLInputElement;
    focused: boolean;

    constructor(public id: string) {
        this.input = <HTMLInputElement>document.getElementById(id);
        this.focused = false;
        this.input.addEventListener("change", () => this.update());
        this.input.addEventListener("focus", () => (this.focused = true));
        this.input.addEventListener("blur", () => (this.focused = false));

        if (this.id == "picker") {
            function rand255() {
                let val: number = Math.floor(Math.random() * 99);
                return val < 10 ? "0" + val : val.toString();
            }
            this.input.value = `#${rand255()}${rand255()}${rand255()}`;
            window.onload = () => {
                this.input.dispatchEvent(new InputEvent("change"));
            };
        }
    }

    private update(): void {
        function hex2rgb(data: string): [number, number, number] {
            var result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data)!;
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        }

        function rgb2hex(rgb: [number, number, number]): string {
            let r: number = rgb[0],
                g: number = rgb[1],
                b: number = rgb[2];

            function hexConvert(c: number) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }

            return `#${hexConvert(r)}${hexConvert(g)}${hexConvert(b)}`;
        }

        // https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
        function rgb2hsvsl(rgb: [number, number, number]): [number, number, number, number, number] {
            let norm = rgb.map((Number) => Number / 255) as [number, number, number];
            let r: number = norm[0],
                g: number = norm[1],
                b: number = norm[2];

            let max: number = Math.max(...norm);
            let min: number = Math.min(...norm);
            let range: number = max - min;
            let mid: number = min + range / 2;

            let hue: number = 0;
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
                if (hue < 0) hue += 360;
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
        function hsl2rgb(hsl: [number, number, number]): [number, number, number] {
            let hue: number = hsl[0];
            let sat: number = hsl[1] / 100;
            let bright: number = hsl[2] / 100;

            let chroma = (1 - Math.abs(2 * bright - 1)) * sat;
            let mid = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
            let light = bright - chroma / 2;
            let r = -1,
                g = -1,
                b = -1;

            if (0 <= hue && hue < 60) {
                r = chroma;
                g = mid;
                b = 0;
            } else if (60 <= hue && hue < 120) {
                r = mid;
                g = chroma;
                b = 0;
            } else if (120 <= hue && hue < 180) {
                r = 0;
                g = chroma;
                b = mid;
            } else if (180 <= hue && hue < 240) {
                r = 0;
                g = mid;
                b = chroma;
            } else if (240 <= hue && hue < 300) {
                r = mid;
                g = 0;
                b = chroma;
            } else if (300 <= hue && hue < 360) {
                r = chroma;
                g = 0;
                b = mid;
            }

            r = Math.round((r + light) * 255);
            g = Math.round((g + light) * 255);
            b = Math.round((b + light) * 255);

            return [r, g, b];
        }

        // https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB
        function hsv2rgb(hsv: [number, number, number]): [number, number, number] {
            let norm = hsv.map((Number) => Number / 255) as [number, number, number];
            let hue: number = norm[0] * 255;
            let sat: number = norm[1];
            let val: number = norm[2];

            let chroma = (1 - Math.abs(2 * val - 1)) * sat;
            let mid = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
            let light = val - chroma / 2;
            let r = -1,
                g = -1,
                b = -1;

            if (0 <= hue && hue < 60) {
                (r = chroma), (g = mid), (b = 0);
            } else if (60 <= hue && hue < 120) {
                (r = mid), (g = chroma), (b = 0);
            } else if (120 <= hue && hue < 180) {
                (r = 0), (g = chroma), (b = mid);
            } else if (180 <= hue && hue < 240) {
                (r = 0), (g = mid), (b = chroma);
            } else if (240 <= hue && hue < 300) {
                (r = mid), (g = 0), (b = chroma);
            } else if (300 <= hue && hue < 360) {
                (r = chroma), (g = 0), (b = mid);
            }

            r = Math.round((r + light) * 255);
            g = Math.round((g + light) * 255);
            b = Math.round((b + light) * 255);

            return [r, g, b];
        }

        let picker = <HTMLInputElement>document.getElementById("picker");
        let hex = <HTMLInputElement>document.getElementById("hex");
        let rgb_r = <HTMLInputElement>document.getElementById("rgb-r");
        let rgb_b = <HTMLInputElement>document.getElementById("rgb-b");
        let rgb_g = <HTMLInputElement>document.getElementById("rgb-g");
        let hsv_h = <HTMLInputElement>document.getElementById("hsv-h");
        let hsv_s = <HTMLInputElement>document.getElementById("hsv-s");
        let hsv_v = <HTMLInputElement>document.getElementById("hsv-v");
        let hsl_h = <HTMLInputElement>document.getElementById("hsl-h");
        let hsl_s = <HTMLInputElement>document.getElementById("hsl-s");
        let hsl_l = <HTMLInputElement>document.getElementById("hsl-l");

        let hexVal: string = "-1";
        let rgb_arr: [number, number, number] = [-1, -1, -1];
        let hsvsl_arr: [number, number, number, number, number] = [-1, -1, -1, -1, -1];

        switch (this.id) {
            case "hex":
                hexVal = this.input.value;
                rgb_arr = hex2rgb(hexVal);
                hsvsl_arr = rgb2hsvsl(rgb_arr);
                break;
            case "rgb-r":
            case "rgb-g":
            case "rgb-b":
                rgb_arr = [parseInt(rgb_r.value), parseInt(rgb_g.value), parseInt(rgb_b.value)];
                hexVal = rgb2hex(rgb_arr);
                hsvsl_arr = rgb2hsvsl(rgb_arr);
                break;
            case "hsv-h":
            case "hsv-s":
            case "hsv-v":
                rgb_arr = hsv2rgb([parseInt(hsv_h.value), parseInt(hsv_s.value), parseInt(hsv_v.value)]);
                hexVal = rgb2hex(rgb_arr);
                hsvsl_arr = rgb2hsvsl(rgb_arr);
                break;
            case "hsl-h":
            case "hsl-s":
            case "hsl-l":
                rgb_arr = hsl2rgb([parseInt(hsl_h.value), parseInt(hsl_s.value), parseInt(hsl_l.value)]);
                hexVal = rgb2hex(rgb_arr);
                hsvsl_arr = rgb2hsvsl(rgb_arr);
                break;
            default:
                // picker
                hexVal = this.input.value;
                rgb_arr = hex2rgb(hexVal);
                hsvsl_arr = rgb2hsvsl(rgb_arr);
                break;
        }

        picker.value = hexVal;
        hex.value = hexVal;
        rgb_r.value = rgb_arr[0].toString();
        rgb_g.value = rgb_arr[1].toString();
        rgb_b.value = rgb_arr[2].toString();

        if (this.id == "hsl-h" || this.id == "hsl-s" || this.id == "hsl-l") {
            hsv_s.value = hsvsl_arr[1].toString();
            hsv_v.value = hsvsl_arr[2].toString();
        } else if (this.id == "hsv-h" || this.id == "hsv-s" || this.id == "hsv-v") {
            hsl_s.value = hsvsl_arr[3].toString();
            hsl_l.value = hsvsl_arr[4].toString();
        } else {
            hsl_s.value = hsvsl_arr[3].toString();
            hsl_l.value = hsvsl_arr[4].toString();
            hsv_s.value = hsvsl_arr[1].toString();
            hsv_v.value = hsvsl_arr[2].toString();
        }
        hsl_h.value = hsvsl_arr[0].toString();
        hsv_h.value = hsvsl_arr[0].toString();

        // update bg
        document.documentElement.style.setProperty("--outside-bg-color", hex.value);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Init inputs
    const picker = new InputClass("picker");
    const hex = new InputClass("hex");
    const rgb_r = new InputClass("rgb-r");
    const rgb_b = new InputClass("rgb-b");
    const rgb_g = new InputClass("rgb-g");
    const hsv_h = new InputClass("hsv-h");
    const hsv_s = new InputClass("hsv-s");
    const hsv_v = new InputClass("hsv-v");
    const hsl_h = new InputClass("hsl-h");
    const hsl_s = new InputClass("hsl-s");
    const hsl_l = new InputClass("hsl-l");

    new CopyButton("copy-hex");
    new CopyButton("copy-rgb");
    new CopyButton("copy-hsv");
    new CopyButton("copy-hsl");

    // setInterval(function () {
    //     if (this.focused) update()
    //     if (this.focused) update()
    // }, 50)
});

class CopyButton {
    button: HTMLButtonElement;

    constructor(public id: string) {
        this.button = <HTMLButtonElement>document.getElementById(id);

        this.button.addEventListener("click", function () {
            let value = "";
            switch (id) {
                case "copy-hex":
                    value = (<HTMLInputElement>document.getElementById("hex")!).value!;
                    break;
                case "copy-rgb":
                    value =
                        (<HTMLInputElement>document.getElementById("rgb-r")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("rgb-g")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("rgb-b")!).value!;
                    break;
                case "copy-hsv":
                    value =
                        (<HTMLInputElement>document.getElementById("hsv-h")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("hsv-s")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("hsv-v")!).value!;
                    break;
                case "copy-hsl":
                    value =
                        (<HTMLInputElement>document.getElementById("hsl-h")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("hsl-s")!).value! +
                        ", " +
                        (<HTMLInputElement>document.getElementById("hsl-l")!).value!;
                    break;
            }
            navigator.clipboard.writeText(value);
        });
    }
}
