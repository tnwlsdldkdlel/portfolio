/**
 * 판단 근거 문단을 문장 단위 불릿으로 쪼갠다.
 *
 * 마침표를 그냥 자르면 "20.30MB" · "4.6s" 같은 수치가 함께 잘린다.
 * 그래서 한글(또는 닫는 괄호·따옴표) 뒤에 오는 마침표만 문장 끝으로 본다.
 *
 * `.mjs` 인 이유는 lib/metric.mjs 와 같다 — 러너 없이 `node --test` 로 돌린다.
 */

const END = /(?<=[가-힣)\]”’"'][.?!])\s+/g;

/**
 * @param {string} text
 * @returns {string[]}
 */
export function toBullets(text) {
  return String(text)
    .split(END)
    .map((s) => s.trim())
    .filter(Boolean);
}
