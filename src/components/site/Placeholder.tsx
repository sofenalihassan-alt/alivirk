import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Clearly labelled spot for content that has not been supplied yet. */
export function PlaceholderTag({ className, children = "Placeholder" }: { className?: string | undefined; children?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ImagePlaceholder({ label, className }: { label: string; className?: string | undefined }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-dashed border-hairline bg-[repeating-linear-gradient(135deg,oklch(1_0_0/3%)_0_12px,transparent_12px_24px)] p-6 text-center",
        className,
      )}
    >
      <ImagePlus className="size-6 text-gold" aria-hidden="true" />
      <p className="max-w-[16rem] text-sm text-muted-foreground">{label}</p>
      <PlaceholderTag>Image placeholder</PlaceholderTag>
    </div>
  );
}
