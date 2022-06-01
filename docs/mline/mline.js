"use strict";
const OUTPUT = document.getElementById('outp');
const INPUT = document.getElementById('inp');
OUTPUT.addEventListener('change', upd);
INPUT.addEventListener('change', upd);
const TABN = document.getElementById('tabn');
const SPAC = document.getElementById('spaces');
const TABS = document.getElementById('tabs');
TABN.addEventListener('input', upd);
SPAC.addEventListener('change', upd);
TABS.addEventListener('change', upd);
function spaceChar() {
    return SPAC.checked ? " " : "\t";
}
function spaceN() {
    return parseInt("0" + TABN.value);
}
function genSpace() {
    return spaceN() == 0 ? "" : spaceChar().repeat(spaceN());
}
const CLEAN = document.getElementById('clean');
const BREAK = document.getElementById('break');
const BREAKAT = document.getElementById('breakat');
CLEAN.addEventListener('change', upd);
BREAK.addEventListener('change', upd);
BREAKAT.addEventListener('input', upd);
function toBreak() {
    return BREAK.checked;
}
function toClean() {
    return CLEAN.checked;
}
function breakN() {
    return BREAKAT.value == "" ? 80 : parseInt(BREAKAT.value);
}
function getSelected() {
    return document.querySelector('input[name="format"]:checked').id;
}
function upd() {
    let str = INPUT.value.trim();
    if (str.length != 0) {
        let arr = str.split('\n');
        let result = [];
        let to_break = toBreak();
        let break_n = breakN();
        for (let i = 0, j = 0; i < arr.length; j += 1) {
            let line = arr[i];
            if (toClean()) {
                line = line.trim();
            }
            if (['json', 'java', 'javasb', 'sharp'].includes(getSelected())) {
                line = line.replaceAll(`"`, `\\"`);
            }
            if (to_break && line.length > break_n) {
                let break_at = line.charAt(break_n - 1) == '\\' ? Math.max(break_n - 1, 2) : break_n;
                result[j] = line.slice(0, break_at);
                arr[i] = line.slice(break_at);
            }
            else {
                result[j] = line;
                i += 1;
            }
        }
        OUTPUT.value = parse(result);
    }
}
function parse(arr) {
    return jsonify(arr);
}
function masterParse(begin, endl, newl, arr, close) {
    if (!(close)) {
        close = begin;
    }
    let between = endl.trim() + "\n" + genSpace() + newl;
    return begin + arr.join(between) + close;
}
function notmyjob(arr) {
    return masterParse(``, ``, ``, arr);
}
function jsonify(arr) {
    return masterParse(`"`, `",`, `"`, arr);
}
function pythonify(arr) {
    return masterParse('`', `\` \\`, '`', arr);
}
function pythonify2(arr) {
    return masterParse('\'\'\'\\\n' + genSpace(), '', '', arr, '\n' + genSpace() + '\'\'\'');
}
function javaify(arr) {
    return masterParse('"', '\\n"\n', '+ "', arr, '";');
}
function sbify(arr) {
    return masterParse('new StringBuilder()\n    .append("', '\\n")\n', '    .append("', arr, '\\n").toString();');
}
function goify(arr) {
    return masterParse('`', ``, '', arr);
}
function jsify(arr) {
    return masterParse(`'`, `\\n' + `, `'`, arr);
}
function seesharp(arr) {
    return masterParse('@"', '', '', arr, '";');
}
//# sourceMappingURL=mline.js.map