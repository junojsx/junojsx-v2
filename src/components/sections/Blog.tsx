import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { ALL_POSTS_QUERY } from "@/lib/queries";
import type { SanityPost } from "@/types";

function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

type BlogProps = {
  /** When true, the page title is an `h1` (use on `/blog` only). */
  standalone?: boolean;
};

export default function Blog({ standalone = false }: BlogProps) {
  const HeadingTag = standalone ? "h1" : "h2";
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? 'n5l953ie';
    const query = encodeURIComponent(ALL_POSTS_QUERY);
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/production?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setPosts(json.result ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-[#FBF9F5] text-dark-gray"
    >
      {/* Paper grain + corner wash — decorative */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-soft-lavender/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-15%] h-80 w-80 rounded-full bg-warm-gold/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
        <header className="max-w-2xl mb-14 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-deep-purple/80 mb-4">
            Writing
          </p>
          <HeadingTag
            id="blog-heading"
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold text-deep-purple leading-[1.08] tracking-tight"
          >
            Notes on access, craft, and the quiet details.
          </HeadingTag>
          <p className="mt-5 text-base sm:text-lg text-dark-gray/75 leading-relaxed">
            Short essays and practical snippets — mostly about building
            interfaces that feel intentional for every input modality.
          </p>
        </header>

        {loading ? (
          <ol className="space-y-6 sm:space-y-8 list-none p-0 m-0">
            {[1, 2, 3].map((n) => (
              <li key={n}>
                <div className="rounded-2xl border border-dark-gray/10 bg-white/80 p-6 sm:p-8 animate-pulse">
                  <div className="h-4 w-32 rounded bg-dark-gray/10 mb-4" />
                  <div className="h-6 w-2/3 rounded bg-dark-gray/10 mb-3" />
                  <div className="h-4 w-full rounded bg-dark-gray/10" />
                </div>
              </li>
            ))}
          </ol>
        ) : error ? (
          <p className="text-dark-gray/50 text-sm">
            Couldn't load posts right now — try refreshing.
          </p>
        ) : posts.length === 0 ? (
          <p className="text-dark-gray/50 text-sm">No posts yet. Check back soon.</p>
        ) : (
          <ol className="space-y-6 sm:space-y-8 list-none p-0 m-0">
            {posts.map((post, index) => (
              <li key={post._id}>
                <article
                  id={post.slug.current}
                  className={[
                    "group relative scroll-mt-28 rounded-2xl border border-dark-gray/10 bg-white/80 backdrop-blur-sm",
                    "shadow-sm transition-shadow duration-300 hover:shadow-md",
                    "motion-safe:opacity-0 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-forwards",
                  ].join(" ")}
                  style={{
                    animationDelay: `${80 + index * 90}ms`,
                  }}
                >
                  <Link
                    to={`/blog/${post.slug.current}`}
                    className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl outline-none
                               focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5]"
                    aria-label={`${post.title} — ${post.readMinutes} min read`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-dark-gray/60">
                      <time dateTime={post.publishedAt}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                      <span className="text-dark-gray/30" aria-hidden="true">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{post.readMinutes} min read</span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold text-deep-purple group-hover:text-soft-teal transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-dark-gray/75 leading-relaxed">
                          {post.summary}
                        </p>
                        {post.tags?.length > 0 && (
                          <ul
                            className="mt-4 flex flex-wrap gap-2"
                            aria-label="Topics"
                          >
                            {post.tags.map((tag) => (
                              <li key={tag}>
                                <span className="inline-block rounded-full border border-deep-purple/15 bg-deep-purple/[0.06] px-3 py-1 text-xs font-medium text-deep-purple">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <span
                        className="inline-flex shrink-0 items-center justify-center rounded-full border border-dark-gray/15 bg-light-gray/50 p-2.5 text-deep-purple transition-colors group-hover:border-soft-teal/40 group-hover:bg-soft-teal/10 group-hover:text-soft-teal"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
