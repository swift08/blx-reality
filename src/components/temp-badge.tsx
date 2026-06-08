import { cn } from "@/lib/utils";
import type { Temperature } from "@/lib/mock-data";

const map: Record<Temperature, string> = {
  Hot: "bg-hot text-hot-foreground",
  Warm: "bg-warm text-warm-foreground",
  Cold: "bg-cold text-cold-foreground",
};

export function TempBadge({ value }: { value: Temperature }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold", map[value])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {value}
    </span>
  );
}

export function StageBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-primary-soft text-primary">
      {value}
    </span>
  );
}
