"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** 목록 위에 겹쳐 띄우는 상세 — 닫기는 곧 뒤로가기라 URL 과 히스토리가 그대로 산다. */
export function Modal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  /** dialog 는 바깥 클릭으로 닫히지 않는다 — 좌표로 판별해 직접 닫는다. */
  function closeOnBackdrop(e: React.MouseEvent<HTMLDialogElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;

    const inside =
      e.clientX >= box.left &&
      e.clientX <= box.right &&
      e.clientY >= box.top &&
      e.clientY <= box.bottom;

    if (!inside) ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={() => router.back()}
      onClick={closeOnBackdrop}
    >
      <button
        type="button"
        className="modal__close"
        onClick={() => ref.current?.close()}
        aria-label="닫기"
      >
        ✕
      </button>
      <div className="modal__scroll">{children}</div>
    </dialog>
  );
}
