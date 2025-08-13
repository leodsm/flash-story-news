import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchLatestPosts, SimplePost } from "@/utils/wordpress";

const NewsItem = ({ item }: { item: SimplePost }) => (
  <article className="grid grid-cols-[100px,1fr] gap-4 p-3 rounded-xl bg-card border card-elevated" aria-label={item.title}>
    <img
      src={item.image}
      alt={item.title}
      loading="lazy"
      className="h-24 w-24 object-cover rounded-lg"
    />
    <div className="text-left">
      {item.category && (
        <p className="text-xs font-medium text-muted-foreground mb-1">{item.category}</p>
      )}
      <h3 className="font-display font-bold text-lg leading-snug">{item.title}</h3>
      {item.subtitle && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.subtitle}</p>
      )}
    </div>
  </article>
);

const NewsList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["latest-posts"],
    queryFn: ({ pageParam = 1 }) => fetchLatestPosts(pageParam, 6),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length > 0 ? (lastPageParam as number) + 1 : undefined,
  });

  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinel.current) return;
    const el = sentinel.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const items = data?.pages.flat() ?? [];

  return (
    <section aria-labelledby="feed-title" className="px-4">
      <h2 id="feed-title" className="sr-only">Últimas notícias</h2>
      <div className="space-y-3">
        {status === "pending" && (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[100px,1fr] gap-4 p-3 rounded-xl bg-muted/40">
                <div className="h-24 w-24 rounded-lg bg-muted" />
                <div>
                  <div className="h-3 w-24 rounded bg-muted mb-2" />
                  <div className="h-4 w-3/4 rounded bg-muted mb-2" />
                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}
        {items.map((p) => (
          <a key={p.id} href={p.link} target="_blank" rel="noopener" className="block">
            <NewsItem item={p} />
          </a>
        ))}
        <div ref={sentinel} />
      </div>
    </section>
  );
};

export default NewsList;
