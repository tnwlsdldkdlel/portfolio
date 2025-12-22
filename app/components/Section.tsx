import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  isFirst?: boolean;
}

export default function Section({ id, children, className = "", isFirst = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-[calc(100vh-6rem)] py-20 px-4 ${isFirst ? "pt-8" : ""} ${className}`}
    >
      <div className="container mx-auto text-left">
        {children}
      </div>
    </section>
  );
}

