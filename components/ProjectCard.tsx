import Image from "next/image";
import Link from "next/link";
import { publishingClients, type Project } from "@/content/projects";

function Badge({ audience }: { audience: Project["audience"] }) {
  const internal = audience === "사내 서비스";

  return (
    <span className={`card__badge${internal ? " card__badge--in" : ""}`}>
      {audience}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    // 팝업으로 열리는 이동이라 배경을 움직이지 않는다 — 라우터의 기본 스크롤을 끈다
    <Link href={`/projects/${project.slug}`} scroll={false} className="card">
      <span className="card__cover">
        {project.ogImage ? (
          <Image
            src={project.ogImage}
            alt=""
            width={1200}
            height={630}
            className="card__img"
            sizes="(min-width: 60rem) 24rem, 100vw"
          />
        ) : (
          <span className="card__fallback">{project.name}</span>
        )}
      </span>

      <span className="card__body">
        <Badge audience={project.audience} />

        <h3 className="card__title">
          {project.name}
          <span className="card__arrow" aria-hidden="true">
            →
          </span>
        </h3>

        <span className="card__desc">{project.tagline}</span>

        <span className="tags card__tags">
          {project.stack.slice(0, 5).map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

/** 개별 카드로 세울 만큼 크지 않은 광고주 퍼블리싱 건들 — 한 장에 모은다. */
export function PublishingCard() {
  return (
    <div className="card card--static">
      <span className="card__cover">
        <span className="card__fallback">Publishing</span>
      </span>

      <span className="card__body">
        <Badge audience="외부 서비스" />

        <h3 className="card__title">
          그 외 다수 광고주 퍼블리싱
        </h3>

        <span className="card__desc">
          캠페인 랜딩·보험 상품 페이지·기업 사이트를 시안 그대로 퍼블리싱하고
          배포까지 맡았습니다.
        </span>

        <span className="tags card__tags">
          {publishingClients.map((c) => (
            <span className="tag" key={c}>
              {c}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
