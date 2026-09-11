/**
 * 지표 문자열을 비교 가능한 수로 바꾸고, 카드 썸네일용 막대 비율을 만든다.
 *
 * TS 가 아니라 .mjs 인 이유: node:test 로 빌드 도구 없이 그대로 돌리기 위해서다.
 * (`npm test` — 러너도 트랜스파일러도 추가하지 않는다)
 *
 * @typedef {{ label: string, before?: string, after: string, delta?: string, note?: string }} Metric
 */

const UNITS = { MB: 1024, KB: 1, B: 1 / 1024 };

/**
 * "20.30MB" · "1,782KB" · "4.6s" · "64" 를 수로 바꾼다.
 * 단위가 있으면 KB 기준으로 맞추고, 없으면 숫자를 그대로 쓴다.
 * 숫자가 없거나 둘 이상이면(예: "100 / 100") null — 차트를 그리지 않는다.
 * @param {string} raw
 * @returns {number | null}
 */
export function toNumber(raw) {
  const cleaned = String(raw).replace(/,/g, "");
  const found = cleaned.match(/-?\d+(?:\.\d+)?\s*(?:MB|KB|B|s|ms|%)?/gi);
  if (!found || found.length !== 1) return null;

  const parts = found[0].match(/(-?\d+(?:\.\d+)?)\s*(MB|KB|B|s|ms|%)?/i);
  if (!parts) return null;

  const value = Number(parts[1]);
  if (!Number.isFinite(value)) return null;

  const factor = parts[2] ? UNITS[parts[2].toUpperCase()] : undefined;
  return factor ? value * factor : value;
}

/**
 * @param {Metric} metric
 * @returns {{ beforeRatio: number, afterRatio: number, lowerIsBetter: boolean } | null}
 */
export function toChart(metric) {
  if (!metric || !metric.before) return null;
  const before = toNumber(metric.before);
  const after = toNumber(metric.after);
  if (before === null || after === null) return null;
  if (before <= 0 || after < 0 || before === after) return null;

  const max = Math.max(before, after);
  return {
    beforeRatio: before / max,
    afterRatio: after / max,
    lowerIsBetter: after < before,
  };
}

/**
 * 카드에 세울 지표 — 차트를 그릴 수 있는 것을 먼저 고른다.
 * @param {Metric[]} [metrics]
 * @returns {Metric | undefined}
 */
export function leadMetric(metrics = []) {
  return (
    metrics.find((m) => toChart(m)) ??
    metrics.find((m) => m.before) ??
    metrics.find((m) => m.after.length <= 24) ??
    metrics[0]
  );
}
