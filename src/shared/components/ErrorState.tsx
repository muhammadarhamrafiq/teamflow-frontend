import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type ErrorStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "Please try again or come back in a few minutes.",
  action,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive",
        className,
      )}
      role="alert"
    >
      <p className="font-semibold text-destructive">{title}</p>
      <p className="mt-1 text-xs text-destructive/80">{message}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
};

export default ErrorState;
