import { MapPin, Search, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const providers = [
  { name: "Electrician", ur: "الیکٹریشن", rating: "4.9", km: "1.2 km" },
  { name: "Plumber", ur: "پلمبر", rating: "4.8", km: "2.4 km" },
  { name: "Cleaner", ur: "صفائی", rating: "4.7", km: "3.1 km" },
];

/** Illustrative UI preview of the Skill Serve concept (built in code, not a screenshot). */
export function SkillServeMockup({ className }: { className?: string | undefined }) {
  return (
    <div className={cn("relative", className)} role="img" aria-label="Illustrative preview of the Skill Serve app: search, nearby providers and an emergency service button">
      {/* Browser frame */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="ml-3 flex-1 truncate rounded-full bg-glass px-3 py-1 text-[0.65rem] text-muted-foreground">skillserve.store</span>
        </div>
        <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Skill<span className="text-gold">Serve</span></p>
              <div className="flex rounded-full bg-glass p-0.5 text-[0.6rem]">
                <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">EN</span>
                <span className="px-2 py-0.5 text-muted-foreground">اردو</span>
              </div>
            </div>
            <p className="mt-5 font-display text-xl leading-tight font-medium sm:text-2xl">
              Skilled help,<br /><span className="font-serif italic font-normal text-gold">right around the corner.</span>
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-hairline bg-background/40 px-3 py-2.5 text-xs text-muted-foreground">
              <Search className="size-3.5" aria-hidden="true" /> Search electricians, plumbers…
              <span className="ml-auto flex items-center gap-1 text-gold"><MapPin className="size-3" aria-hidden="true" /> Near me</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Electrician", "Plumber", "Cleaner", "Carpenter", "AC repair"].map((c) => (
                <span key={c} className="rounded-full border border-hairline px-2.5 py-1 text-[0.65rem] text-muted-foreground">{c}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            {providers.map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-xl bg-glass p-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-gold/15 font-display text-xs text-gold">{p.name[0]}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{p.name} <span className="text-muted-foreground" lang="ur" dir="rtl">· {p.ur}</span></p>
                  <p className="text-[0.62rem] text-muted-foreground">{p.km} away</p>
                </div>
                <span className="flex items-center gap-0.5 text-[0.65rem] text-gold"><Star className="size-3 fill-current" aria-hidden="true" />{p.rating}</span>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-2.5 text-xs font-medium text-destructive">
              <Zap className="size-3.5" aria-hidden="true" /> Emergency service
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.65rem] tracking-wide text-muted-foreground">Illustrative concept preview · sample data</p>
    </div>
  );
}
