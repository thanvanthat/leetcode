import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  title: string;
  className?: string;
}

/** Editorial section marker, e.g. "[ 03 ] — Game Development". */
export function SectionLabel({ index, title, className }: SectionLabelProps) {
  return (
    <div className={cn("label flex items-center gap-3 text-ash", className)}>
      <span className="text-bone">[ {index} ]</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
      <span>{title}</span>
    </div>
  );
}
