const OUTPUT = <HTMLTextAreaElement>document.getElementById('outp')
const INPUT = <HTMLTextAreaElement>document.getElementById('inp')

OUTPUT.addEventListener('change', upd)
INPUT.addEventListener('change', upd)

const TABN = <HTMLInputElement>document.getElementById('tabn')
const SPAC = <HTMLInputElement>document.getElementById('spaces')
const TABS = <HTMLInputElement>document.getElementById('tabs')

TABN.addEventListener('input', upd)
SPAC.addEventListener('change', upd)
TABS.addEventListener('change', upd)


function spaceChar(): string {
    return SPAC.checked ? " " : "\t";
}

function spaceN(): number {
    return parseInt("0" + TABN.value)
}

function genSpace(): string {
    return spaceN() == 0 ? "" : spaceChar().repeat(spaceN())
}

const CLEAN = <HTMLInputElement>document.getElementById('clean')
const BREAK = <HTMLInputElement>document.getElementById('break')
const BREAKAT = <HTMLInputElement>document.getElementById('breakat')

CLEAN.addEventListener('change', upd)
BREAK.addEventListener('change', upd)
BREAKAT.addEventListener('input', upd)

function toBreak(): boolean {
    return BREAK.checked
}

function toClean(): boolean {
    return CLEAN.checked
}

function breakN(): number {
    return BREAKAT.value == "" ? 80 : parseInt(BREAKAT.value)
}

function getSelected(): string {
    return (<HTMLInputElement>document.querySelector('input[name="format"]:checked')!).id;
}


function upd() {
    let str = INPUT.value.trim();
    if (str.length != 0) {

        let arr = str.split('\n')
        let result = []

        let to_break = toBreak();
        let break_n = breakN();

        for (let i = 0, j = 0; i < arr.length; j += 1) {
            let line = arr[i];
            if (toClean()) {
                line = line.trim()
            }
            if (['json', 'java', 'javasb', 'sharp'].includes(getSelected())) {
                line = line.replace(`"`, `\\"`)
            }

            if (to_break && line.length > break_n) {
                let break_at = line.charAt(break_n - 1) == '\\' ? Math.max(break_n - 1, 2) : break_n
                result[j] = line.slice(0, break_at)
                arr[i] = line.slice(break_at)
            } else {
                result[j] = line
                i += 1
            }
        }
        OUTPUT.value = parse(result)
    }

}

function parse(arr: string[]): string {
    return jsonify(arr)
}

// ===========
// = Parsers =
// ===========

function masterParse(begin: string, endl: string, newl: string, arr: string[]): string;
function masterParse(begin: string, endl: string, newl: string, arr: string[], close: string,): string;
function masterParse(begin: string, endl: string, newl: string, arr: string[], close?: string): string {
    if (!(close)) {
        close = begin
    }
    let between = endl.trim() + "\n" + genSpace() + newl;
    return begin + arr.join(between) + close
}

function notmyjob(arr: string[]): string {
    return masterParse(``, ``, ``, arr)
}

function jsonify(arr: string[]): string {
    return masterParse(`"`, `",`, `"`, arr)
}

function pythonify(arr: string[]) {
    return masterParse('`', `\` \\`, '`', arr)
}

function pythonify2(arr: string[]) {
    return masterParse('\'\'\'\\\n' + genSpace(), '', '', arr, '\n' + genSpace() + '\'\'\'')
}

function javaify(arr: string[]) {
    return masterParse('"', '\\n"\n', '+ "', arr, '";')
}


function sbify(arr: string[]) {
    return masterParse('new StringBuilder()\n    .append("', '\\n")\n', '    .append("', arr, '\\n").toString();')
}


function goify(arr: string[]) {
    return masterParse('`', ``, '', arr)
}


function jsify(arr: string[]) {
    return masterParse(`'`, `\\n' + `, `'`, arr)
}


function seesharp(arr: string[]) {
    return masterParse('@"', '', '', arr, '";')
}
