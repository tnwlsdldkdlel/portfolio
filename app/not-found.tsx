import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell" style={{ paddingBlock: "clamp(6rem, 16vw, 12rem)" }}>
      <p className="hero__meta">
        <span>404</span>
        <span aria-hidden="true">/</span>
        <span>측정값 없음</span>
      </p>
      <h1 className="display" style={{ maxWidth: "16ch" }}>
        이 경로에는 <em>기록이 없습니다.</em>
      </h1>
      <p className="lede" style={{ marginTop: "2rem", maxWidth: "44ch" }}>
        주소가 바뀌었거나 아직 쓰이지 않은 페이지입니다.
      </p>
      <p style={{ marginTop: "2rem" }}> 
        <Link href="/projects" className="link-out">
          전체 기록으로 →
        </Link>
      </p>
    </section>
  );
}
