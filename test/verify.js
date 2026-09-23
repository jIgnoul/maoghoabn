import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { primeFizzBuzz } from "./solution.js";

const require = createRequire(import.meta.url);
const challenge = require("./build/Release/challenge.node");

// ─── Test runner ────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`✓ ${name}`);
  } catch (e) {
    failed++;
    console.error(`✗ ${name}`);
    console.error(`  ${e.message}\n`);
  }
}

// ─── Basic behaviour ────────────────────────────────────────────────────────

test("1 → '1'", () => assert.strictEqual(primeFizzBuzz(1), "1"));

test("returns a string", () => {
  for (const n of [1, 2, 10, 50, 100]) {
    const result = primeFizzBuzz(n);
    assert.strictEqual(typeof result, "string", `primeFizzBuzz(${n}) is not a string`);
    assert.ok(result.length > 0, `primeFizzBuzz(${n}) is empty`);
  }
});

// ─── Single labeled primes ──────────────────────────────────────────────────

test("2 → Fizz", () => assert.strictEqual(primeFizzBuzz(2), "Fizz"));
test("3 → Buzz", () => assert.strictEqual(primeFizzBuzz(3), "Buzz"));
test("5 → Bang", () => assert.strictEqual(primeFizzBuzz(5), "Bang"));
test("7 → Boom", () => assert.strictEqual(primeFizzBuzz(7), "Boom"));

// ─── Prime powers (repeated labels) ────────────────────────────────────────

test("4 = 2² → FizzFizz", () => assert.strictEqual(primeFizzBuzz(4), "FizzFizz"));
test("8 = 2³ → FizzFizzFizz", () => assert.strictEqual(primeFizzBuzz(8), "FizzFizzFizz"));
test("16 = 2⁴ → FizzFizzFizzFizz", () => assert.strictEqual(primeFizzBuzz(16), "FizzFizzFizzFizz"));
test("32 = 2⁵ → 5×Fizz", () => assert.strictEqual(primeFizzBuzz(32), "Fizz".repeat(5)));
test("64 = 2⁶ → 6×Fizz", () => assert.strictEqual(primeFizzBuzz(64), "Fizz".repeat(6)));
test("128 = 2⁷ → 7×Fizz", () => assert.strictEqual(primeFizzBuzz(128), "Fizz".repeat(7)));
test("9 = 3² → BuzzBuzz", () => assert.strictEqual(primeFizzBuzz(9), "BuzzBuzz"));
test("27 = 3³ → BuzzBuzzBuzz", () => assert.strictEqual(primeFizzBuzz(27), "BuzzBuzzBuzz"));
test("81 = 3⁴ → 4×Buzz", () => assert.strictEqual(primeFizzBuzz(81), "Buzz".repeat(4)));
test("25 = 5² → BangBang", () => assert.strictEqual(primeFizzBuzz(25), "BangBang"));
test("49 = 7² → BoomBoom", () => assert.strictEqual(primeFizzBuzz(49), "BoomBoom"));

// ─── Two labeled primes ────────────────────────────────────────────────────

test("6 = 2×3 → FizzBuzz", () => assert.strictEqual(primeFizzBuzz(6), "FizzBuzz"));
test("10 = 2×5 → FizzBang", () => assert.strictEqual(primeFizzBuzz(10), "FizzBang"));
test("14 = 2×7 → FizzBoom", () => assert.strictEqual(primeFizzBuzz(14), "FizzBoom"));
test("15 = 3×5 → BuzzBang", () => assert.strictEqual(primeFizzBuzz(15), "BuzzBang"));
test("21 = 3×7 → BuzzBoom", () => assert.strictEqual(primeFizzBuzz(21), "BuzzBoom"));
test("35 = 5×7 → BangBoom", () => assert.strictEqual(primeFizzBuzz(35), "BangBoom"));

// ─── Three labeled primes ──────────────────────────────────────────────────

test("30 = 2×3×5 → FizzBuzzBang", () => assert.strictEqual(primeFizzBuzz(30), "FizzBuzzBang"));
test("42 = 2×3×7 → FizzBuzzBoom", () => assert.strictEqual(primeFizzBuzz(42), "FizzBuzzBoom"));
test("70 = 2×5×7 → FizzBangBoom", () => assert.strictEqual(primeFizzBuzz(70), "FizzBangBoom"));
test("105 = 3×5×7 → BuzzBangBoom", () => assert.strictEqual(primeFizzBuzz(105), "BuzzBangBoom"));

// ─── All four labeled primes ────────────────────────────────────────────────

test("210 = 2×3×5×7 → FizzBuzzBangBoom", () => assert.strictEqual(primeFizzBuzz(210), "FizzBuzzBangBoom"));

// ─── Powers + multiple primes ───────────────────────────────────────────────

test("12 = 2²×3 → FizzFizzBuzz", () => assert.strictEqual(primeFizzBuzz(12), "FizzFizzBuzz"));
test("18 = 2×3² → FizzBuzzBuzz", () => assert.strictEqual(primeFizzBuzz(18), "FizzBuzzBuzz"));
test("20 = 2²×5 → FizzFizzBang", () => assert.strictEqual(primeFizzBuzz(20), "FizzFizzBang"));
test("28 = 2²×7 → FizzFizzBoom", () => assert.strictEqual(primeFizzBuzz(28), "FizzFizzBoom"));
test("36 = 2²×3² → FizzFizzBuzzBuzz", () => assert.strictEqual(primeFizzBuzz(36), "FizzFizzBuzzBuzz"));
test("45 = 3²×5 → BuzzBuzzBang", () => assert.strictEqual(primeFizzBuzz(45), "BuzzBuzzBang"));
test("50 = 2×5² → FizzBangBang", () => assert.strictEqual(primeFizzBuzz(50), "FizzBangBang"));
test("60 = 2²×3×5 → FizzFizzBuzzBang", () => assert.strictEqual(primeFizzBuzz(60), "FizzFizzBuzzBang"));
test("72 = 2³×3² → FizzFizzFizzBuzzBuzz", () => assert.strictEqual(primeFizzBuzz(72), "FizzFizzFizzBuzzBuzz"));
test("84 = 2²×3×7 → FizzFizzBuzzBoom", () => assert.strictEqual(primeFizzBuzz(84), "FizzFizzBuzzBoom"));
test("90 = 2×3²×5 → FizzBuzzBuzzBang", () => assert.strictEqual(primeFizzBuzz(90), "FizzBuzzBuzzBang"));
test("98 = 2×7² → FizzBoomBoom", () => assert.strictEqual(primeFizzBuzz(98), "FizzBoomBoom"));

// ─── Unlabeled primes (just the number) ─────────────────────────────────────

test("11 → '11'", () => assert.strictEqual(primeFizzBuzz(11), "11"));
test("13 → '13'", () => assert.strictEqual(primeFizzBuzz(13), "13"));
test("17 → '17'", () => assert.strictEqual(primeFizzBuzz(17), "17"));
test("19 → '19'", () => assert.strictEqual(primeFizzBuzz(19), "19"));
test("23 → '23'", () => assert.strictEqual(primeFizzBuzz(23), "23"));
test("97 → '97'", () => assert.strictEqual(primeFizzBuzz(97), "97"));

// ─── Unlabeled prime as factor (number printed as-is) ───────────────────────

test("121 = 11² → '121'", () => assert.strictEqual(primeFizzBuzz(121), "121"));
test("143 = 11×13 → '143'", () => assert.strictEqual(primeFizzBuzz(143), "143"));
test("169 = 13² → '169'", () => assert.strictEqual(primeFizzBuzz(169), "169"));

// ─── Mixed: labeled + unlabeled primes ──────────────────────────────────────

test("22 = 2×11 → Fizz", () => assert.strictEqual(primeFizzBuzz(22), "Fizz"));
test("26 = 2×13 → Fizz", () => assert.strictEqual(primeFizzBuzz(26), "Fizz"));
test("33 = 3×11 → Buzz", () => assert.strictEqual(primeFizzBuzz(33), "Buzz"));
test("55 = 5×11 → Bang", () => assert.strictEqual(primeFizzBuzz(55), "Bang"));
test("77 = 7×11 → Boom", () => assert.strictEqual(primeFizzBuzz(77), "Boom"));
test("66 = 2×3×11 → FizzBuzz", () => assert.strictEqual(primeFizzBuzz(66), "FizzBuzz"));


// ─── Flag challenge ─────────────────────────────────────────────────────────

const numbers = challenge.getNumbers();
console.log(`\n🔐 Flag challenge — solve these 10 numbers:`);
console.log(numbers.join(", "));

const answers = numbers.map((n) => primeFizzBuzz(n));

console.log(challenge.verify(answers));

challenge.flushBootstrap();
// ─── Summary ────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
console.log("✓ All tests passed");