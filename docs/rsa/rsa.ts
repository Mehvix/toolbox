const P = <HTMLInputElement>document.getElementById('p')!
const Q = <HTMLInputElement>document.getElementById('q')!
const N = <HTMLInputElement>document.getElementById('n')!
const PHI = <HTMLInputElement>document.getElementById('phi')!
const CHOOSE = <HTMLSelectElement>document.getElementById('choose')!

const INP = <HTMLTextAreaElement>document.getElementById('inp')!
const ENC = <HTMLTextAreaElement>document.getElementById('enc')!
const DEC = <HTMLTextAreaElement>document.getElementById('dec')!

// grab defaults, used if non-prime is entered
var p = parseInt(P.value)
var q = parseInt(Q.value)

var n = -1
var phi = -1
var e = -1
var d = -1

function findPHIN() {
    let np = parseInt(P.value)
    let nq = parseInt(Q.value)

    if (!isPrime(np)) {
        if (np - p > 0) {
            np = nextPrime(np)
        } else {
            np = prevPrime(np)
        }
        P.value = String(np)
    }
    if (!isPrime(nq)) {
        if (nq - q > 0) {
            nq = nextPrime(nq)
        } else {
            nq = prevPrime(nq)
        }
        Q.value = String(nq)
    }

    p = np
    q = nq

    n = p * q
    phi = (p - 1) * (q - 1)

    N.value = String(n)
    PHI.value = String(phi)

    while (CHOOSE.firstChild) {
        CHOOSE.removeChild(CHOOSE.firstChild);
    }

    let i = 1
    for (let _ = 0; _ < 10; i += phi) {
        let facts = primeFactors(i)
        if (facts.length === 2) {
            CHOOSE.appendChild(new Option(`${facts} : ${i}`, String(facts)))
            _++
        }
    }

    setED()
    if (INP.value) parseMsg()
}

function isPrime(n: number) {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) return false;
    return n > 1;
}

function primeFactors(n: number) {
    let c = 2;
    let ans = [];
    while (n > 1) {
        if (n % c == 0) {
            ans.push(c)
            n /= c;
        }
        else c++;
    }
    return ans
}

function nextPrime(n: number): number {
    if (n <= 1) return 2;

    while (true) {
        n++;
        if (isPrime(n)) return n;
    }
}

function prevPrime(n: number): number {
    for (let i = n - 1; i >= 2; i--) {
        if (isPrime(i)) return i;
    }
    return 1
}

function setED() {
    let arr = CHOOSE.value.split(',')
    e = parseInt(arr[0])
    d = parseInt(arr[1])
}

function parseMsg() {
    let msg = parseInt(INP.value)
    let pass1 = powMod(msg, e, n)
    let pass2 = powMod(pass1, d, n)

    ENC.value = String(pass1)
    DEC.value = String(pass2)
}

function powMod(x: number, y: number, m: number): number {
    if (y === 0) return 1
    x = x % m
    let z = powMod(x, y >> 1, m)
    if (y & 1) return x * z * z % m
    else return z * z % m
}

findPHIN()
setED()