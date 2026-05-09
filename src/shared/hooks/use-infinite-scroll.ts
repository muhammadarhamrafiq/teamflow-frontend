import { useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
};

const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin]);

  return sentinelRef;
};

export default useInfiniteScroll;
