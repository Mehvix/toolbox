"use strict";
const P = document.getElementById('p');
const Q = document.getElementById('q');
const N = document.getElementById('n');
const PHI = document.getElementById('phi');
const CHOOSE = document.getElementById('choose');
const INP = document.getElementById('inp');
const ENC = document.getElementById('enc');
const DEC = document.getElementById('dec');
// grab defaults, used if non-prime is entered
var p = parseInt(P.value);
var q = parseInt(Q.value);
var n = -1;
var phi = -1;
var e = -1;
var d = -1;
function findPHIN() {
    let np = Math.max(parseInt(P.value) || 3, 3);
    let nq = Math.max(parseInt(Q.value) || 3, 3);
    if (!isPrime(np)) {
        if (np - p > 0)
            np = nextPrime(np);
        else
            np = prevPrime(np);
    }
    if (!isPrime(nq)) {
        if (nq - q > 0)
            nq = nextPrime(nq);
        else
            nq = prevPrime(nq);
    }
    p = np;
    q = nq;
    n = p * q;
    phi = (p - 1) * (q - 1);
    P.value = String(p);
    Q.value = String(q);
    N.value = String(n);
    PHI.value = String(phi);
    while (CHOOSE.firstChild) {
        CHOOSE.removeChild(CHOOSE.firstChild);
    }
    for (let _ = 0, i = 1; _ < 15; i += phi) {
        let facts = primeFactors(i);
        if (facts.length === 2) {
            CHOOSE.appendChild(new Option(`${facts} : ${i}`, String(facts)));
            _++;
        }
    }
    setED();
    if (INP.value)
        parseMsg();
}
function isPrime(n) {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0)
            return false;
    return n > 1;
}
function primeFactors(n) {
    let c = 2;
    let ans = [];
    while (n > 1) {
        if (n % c == 0) {
            ans.push(c);
            n /= c;
        }
        else
            c++;
    }
    return ans;
}
function nextPrime(n) {
    if (n <= 1)
        return 2;
    while (true) {
        n++;
        if (isPrime(n))
            return n;
    }
}
function prevPrime(n) {
    for (let i = n - 1; i >= 2; i--) {
        if (isPrime(i))
            return i;
    }
    return 1;
}
function setED() {
    let arr = CHOOSE.value.split(',');
    e = parseInt(arr[0]);
    d = parseInt(arr[1]);
    parseMsg();
}
function parseMsg() {
    let msg = parseInt(INP.value);
    if (msg) {
        ENC.value = String(powMod(msg, e, n));
        parseEnc();
    }
}
function parseEnc() {
    let enc = parseInt(ENC.value);
    if (enc) {
        let og = powMod(enc, d, n);
        DEC.value = String(og);
        if (parseInt(INP.value) != og)
            INP.value = String(og);
    }
}
// https://www.eecs70.org/assets/pdf/notes/n6.pdf#page3
function powMod(x, y, m) {
    if (y === 0)
        return 1;
    x = x % m;
    let z = powMod(x, y >> 1, m);
    if (y & 1)
        return x * z * z % m;
    else
        return z * z % m;
}
findPHIN();
setED();
//# sourceMappingURL=rsa.js.map