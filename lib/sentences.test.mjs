import assert from "node:assert/strict";
import { test } from "node:test";
import { toBullets } from "./sentences.mjs";

test("한글 문장 끝에서만 자른다", () => {
  assert.deepEqual(toBullets("첫 문장이다. 둘째 문장이다."), [
    "첫 문장이다.",
    "둘째 문장이다.",
  ]);
});

test("수치 안의 마침표는 자르지 않는다", () => {
  // 실제 본문에 "20.30MB 중 13.6MB" 같은 표기가 있다.
  assert.deepEqual(toBullets("페이지 총 전송 20.30MB 중 13.6MB였다."), [
    "페이지 총 전송 20.30MB 중 13.6MB였다.",
  ]);
  assert.equal(toBullets("LCP가 4.6s에서 변하지 않았다. 제거했다.").length, 2);
});

test("따옴표·괄호로 끝난 문장도 자른다", () => {
  assert.equal(
    toBullets("'바뀌지 않았음'을 증명했다. 게이트에 걸었다.").length,
    2,
  );
  assert.equal(toBullets("바꿨다(디자인은 폐기했다). 픽셀은 지켰다.").length, 2);
});

test("빈 문자열은 항목을 만들지 않는다", () => {
  assert.deepEqual(toBullets("   "), []);
});
