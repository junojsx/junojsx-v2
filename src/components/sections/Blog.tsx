import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlogCardArt from "@/components/blog/BlogCardArt";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { useSanityPostList } from "@/hooks/useSanityPostList";
import type { SanityPost } from "@/types";

/** Pastel card faces — aligned with reference mockup */
const CARD_BACKGROUNDS = [
  "#E8F9EE",
  "#F0F0F2",
  "#CCF5F8",
  "#FDE7F3",
  "#D6EFFF",
  "#FEF9E1",
] as const;

const PAGE_BG = "#EEF1F6";
const TITLE_NAVY = "#162B4D";

function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

type ListItem =
  | { source: "sanity"; post: SanityPost }
  | { source: "static"; post: BlogPost };

function toCardItems(
  loading: boolean,
  error: boolean,
  sanityPosts: SanityPost[],
): ListItem[] {
  if (loading) return [];
  if (sanityPosts.length > 0) {
    return sanityPosts.map((post) => ({ source: "sanity", post }));
  }
  if (error) {
    return blogPosts.map((post) => ({ source: "static", post }));
  }
  return [];
}

type BlogProps = {
  standalone?: boolean;
};

export default function Blog({ standalone = false }: BlogProps) {
  const HeadingTag = standalone ? "h1" : "h2";
  const { posts: sanityPosts, loading, error } = useSanityPostList();
  const items = toCardItems(loading, error, sanityPosts);
  const showFallbackNote = error && !loading && items.length > 0;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative z-0 min-h-[calc(100vh-8rem)] overflow-hidden text-dark-gray"
      style={{ backgroundColor: PAGE_BG }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="mb-12 sm:mb-14">
          <HeadingTag
            id="blog-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]"
            style={{ color: TITLE_NAVY }}
          >
            Blog
          </HeadingTag>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#3d4f6e]/85">
            Essays on accessibility, front-end craft, and shipping interfaces
            that work well for every input and assistive technology.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-[22px] p-7 shadow-[0_4px_24px_rgba(22,43,77,0.06)]"
                style={{
                  backgroundColor: CARD_BACKGROUNDS[i % CARD_BACKGROUNDS.length],
                }}
              >
                <div className="mb-4 flex justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-2/3 rounded-lg bg-white/70" />
                    <div className="h-3 w-24 rounded bg-white/60" />
                  </div>
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white/80" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/55" />
                  <div className="h-3 w-5/6 rounded bg-white/55" />
                  <div className="h-3 w-2/3 rounded bg-white/55" />
                </div>
                <div className="mt-8 h-24 rounded-xl bg-white/40" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#3d4f6e]/70">
            No posts to show yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {items.map((item, index) => {
              const slug =
                item.source === "sanity"
                  ? item.post.slug.current
                  : item.post.slug;
              const title = item.post.title;
              const summary =
                item.source === "sanity"
                  ? item.post.summary
                  : item.post.excerpt;
              const readMinutes =
                item.source === "sanity"
                  ? item.post.readMinutes
                  : item.post.readMinutes;
              const publishedAt =
                item.source === "sanity"
                  ? item.post.publishedAt
                  : item.post.date;
              const bg = CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length];

              return (
                <article
                  key={item.source === "sanity" ? item.post._id : item.post.slug}
                  className={[
                    "group flex h-full flex-col rounded-[22px] p-6 shadow-[0_4px_24px_rgba(22,43,77,0.07)] transition-transform duration-300",
                    "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_12px_32px_rgba(22,43,77,0.1)]",
                  ].join(" ")}
                  style={{ backgroundColor: bg }}
                >
                  <Link
                    to={`/blog/${slug}`}
                    className="flex min-h-[280px] flex-1 flex-col rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF1F6]"
                    aria-label={`Read article: ${title}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h2
                          className="text-lg font-bold leading-snug sm:text-xl"
                          style={{ color: TITLE_NAVY }}
                        >
                          {title}
                        </h2>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "#3d4f6e99" }}
                        >
                          {readMinutes} min read
                          <span className="mx-1.5 opacity-50" aria-hidden="true">
                            ·
                          </span>
                          <time dateTime={publishedAt}>
                            {formatPostDate(publishedAt)}
                          </time>
                        </p>
                      </div>
                      <span
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#162B4D] shadow-sm transition-colors duration-300 group-hover:bg-[#162B4D] group-hover:text-white"
                        aria-hidden="true"
                      >
                        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </div>

                    <p
                      className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed sm:text-[0.9375rem]"
                      style={{ color: "#2b3f5ecc" }}
                    >
                      {summary}
                    </p>

                    <BlogCardArt variant={index} className="mt-5 w-full" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {showFallbackNote ? (
          <p className="mt-8 text-xs text-[#3d4f6e]/60">
            Live CMS feed unavailable — showing curated highlights instead.
          </p>
        ) : null}
      </div>
    </section>
  );
}
