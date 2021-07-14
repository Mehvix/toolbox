document.addEventListener("DOMContentLoaded", function (event) {

    const fin = document.getElementById('autolink')! as HTMLInputElement
    const out = document.getElementById('autout')! as HTMLElement

    fin.addEventListener('input', (e) => {
        let val = (e.target! as HTMLInputElement).value

        if (val == '') {
            out.textContent = ' '
        } else {
            let reg = RegExp('(src=|\/ical\/|cid=)(.*?)(\/|&|$)').exec(val)
            if (reg) {
                out.textContent = 'https://calendar.google.com/calendar/ical/' +
                    decodeURIComponent(reg[2]) +
                    '/public/basic.ics'
            } else {
                out.textContent = 'Invalid URL'
            }
        }
    }, false)

    fin.dispatchEvent(new InputEvent("input"))
})
