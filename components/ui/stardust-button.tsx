"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StardustButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Oculta la flecha del final. */
  hideArrow?: boolean;
}

// Posiciones/retardos de los destellos ("stardust") alrededor del botón.
const SPARKS: React.CSSProperties[] = [
  { top: "-6px", left: "14%", animationDelay: "0s" },
  { top: "-10px", left: "40%", animationDelay: ".6s" },
  { top: "-5px", left: "70%", animationDelay: "1.1s" },
  { bottom: "-8px", left: "24%", animationDelay: ".35s" },
  { bottom: "-6px", left: "56%", animationDelay: ".9s" },
  { bottom: "-10px", left: "84%", animationDelay: "1.4s" },
];

export function StardustButton({
  children,
  href,
  onClick,
  className,
  hideArrow = false,
}: StardustButtonProps) {
  const inner = (
    <>
      <span className="stardust-shine" aria-hidden />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {!hideArrow && (
          <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover/stardust:translate-x-1" />
        )}
      </span>
      {SPARKS.map((s, i) => (
        <span key={i} className="stardust-spark" style={s} aria-hidden />
      ))}
    </>
  );

  const cls = cn("stardust-btn group/stardust", className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function StardustButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <StardustButton href="/rutas">Ver todas las rutas</StardustButton>
    </div>
  );
}

export default StardustButton;
