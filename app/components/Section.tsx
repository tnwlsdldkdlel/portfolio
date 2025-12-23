import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-[calc(100vh-6rem)] py-20 px-4 ${className}`}
    >
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}

