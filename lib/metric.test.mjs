import assert from "node:assert/strict";
import { test } from "node:test";
import { leadMetric, toChart, toNumber } from "./metric.mjs";

test("단위를 KB 기준으로 맞춘다", () => {
  assert.equal(toNumber("20.30MB"), 20.3 * 1024);
  assert.equal(toNumber("1,782KB"), 1782);
  assert.equal(toNumber("64"), 64);
  assert.equal(toNumber("4.6s"), 4.6);
});

test("숫자가 없거나 둘 이상이면 차트를 포기한다", () => {
  assert.equal(toNumber("CSS only"), null);
  assert.equal(toNumber("100 / 100"), null);
  assert.equal(toNumber("단위 없는 설명"), null);
});

test("값 뒤에 붙은 설명은 무시하고 숫자를 읽는다", () => {
  // "745KB PNG" → "39.5KB WebP" 처럼 포맷이 함께 적힌 지표가 실제로 있다.
  assert.equal(toNumber("745KB PNG"), 745);
  assert.equal(toNumber("39.5KB WebP"), 39.5);
});

test("단위가 섞여도 비율이 맞다", () => {
  const chart = toChart({ label: "전송량", before: "20.30MB", after: "1.54MB" });
  assert.ok(chart);
  assert.equal(chart.lowerIsBetter, true);
  assert.equal(chart.beforeRatio, 1);
  assert.ok(Math.abs(chart.afterRatio - 1.54 / 20.3) < 1e-9);
});

test("점수가 오른 경우 비율이 뒤집히지 않는다", () => {
  const chart = toChart({ label: "Perf", before: "49", after: "77" });
  assert.ok(chart);
  assert.equal(chart.lowerIsBetter, false);
  assert.equal(chart.afterRatio, 1);
  assert.ok(Math.abs(chart.beforeRatio - 49 / 77) < 1e-9);
});

test("before 가 없으면 차트가 없다", () => {
  assert.equal(toChart({ label: "테스트", after: "286건" }), null);
});

test("차트를 그릴 수 있는 지표를 먼저 고른다", () => {
  const picked = leadMetric([
    { label: "크롤러", after: "상시 브라우저 + 광고 차단 + 재활용" },
    { label: "전송량", before: "796KB", after: "149KB" },
  ]);
  assert.equal(picked?.label, "전송량");
});
