import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

type SkeletonListProps = {
  count?: number;
  className?: string;
  avatar?: boolean;
  action?: boolean;
};

const SkeletonList = ({
  count = 4,
  className,
  avatar = true,
  action = false,
}: SkeletonListProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {avatar ? <Skeleton className="h-8 w-8 rounded-full" /> : null}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          {action ? <Skeleton className="h-6 w-16" /> : null}
        </div>
      ))}
    </div>
  );
};

type SkeletonGridProps = {
  count?: number;
  className?: string;
};

const SkeletonGrid = ({ count = 6, className }: SkeletonGridProps) => {
  return (
    <div className={cn("grid gap-2 md:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-background/60 p-4"
        >
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-3 h-3 w-1/2" />
          <Skeleton className="mt-6 h-6 w-full" />
        </div>
      ))}
    </div>
  );
};

type SkeletonHeaderProps = {
  className?: string;
};

const SkeletonHeader = ({ className }: SkeletonHeaderProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

type SkeletonCommentListProps = {
  count?: number;
  className?: string;
};

const SkeletonCommentList = ({
  count = 3,
  className,
}: SkeletonCommentListProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonStatGrid = ({ count = 4, className }: SkeletonGridProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-2 lg:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-background/60 p-4"
        >
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="mt-3 h-6 w-2/3" />
        </div>
      ))}
    </div>
  );
};

export {
  SkeletonCommentList,
  SkeletonGrid,
  SkeletonHeader,
  SkeletonList,
  SkeletonStatGrid,
};
