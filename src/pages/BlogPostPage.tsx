import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Clock } from "lucide-react";
import { client } from "@/lib/sanityClient";
import { POST_BY_SLUG_QUERY } from "@/lib/queries";
import type { SanityPost } from "@/types";

function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client.fetch<SanityPost>(POST_BY_SLUG_QUERY, { slug }).then((data) => {
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (notFound) return <Navigate to="/blog" replace />;

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="relative min-h-screen bg-[#FBF9F5] text-dark-gray">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-soft-lavender/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-[-15%] h-80 w-80 rounded-full bg-warm-gold/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-deep-purple/70 hover:text-soft-teal transition-colors mb-12
                       rounded-md outline-none focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to writing
          </Link>

          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-48 rounded bg-dark-gray/10" />
              <div className="h-10 w-4/5 rounded bg-dark-gray/10" />
              <div className="h-4 w-32 rounded bg-dark-gray/10" />
              <div className="space-y-3 pt-8">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="h-4 rounded bg-dark-gray/10" style={{ width: `${70 + (n % 3) * 10}%` }} />
                ))}
              </div>
            </div>
          ) : post ? (
            <article>
              {post.tags?.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-6 list-none p-0 m-0" aria-label="Topics">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-block rounded-full border border-deep-purple/15 bg-deep-purple/[0.06] px-3 py-1 text-xs font-medium text-deep-purple">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold text-deep-purple leading-[1.08] tracking-tight mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-dark-gray/60 mb-4">
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
                {post.readMinutes && (
                  <>
                    <span className="text-dark-gray/30" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readMinutes} min read
                    </span>
                  </>
                )}
              </div>

              {post.summary && (
                <p className="text-lg text-dark-gray/75 leading-relaxed border-l-4 border-soft-lavender pl-4 mb-10">
                  {post.summary}
                </p>
              )}

              {post.body && (
                <div className="prose prose-stone max-w-none
                  [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-deep-purple [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:font-[family-name:var(--font-display)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-deep-purple [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-dark-gray/80 [&_p]:leading-relaxed [&_p]:mb-5
                  [&_a]:text-soft-teal [&_a]:underline [&_a:hover]:text-deep-purple
                  [&_code]:bg-deep-purple/[0.06] [&_code]:text-deep-purple [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm
                  [&_pre]:bg-dark-gray [&_pre]:text-light-gray [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:my-6
                  [&_blockquote]:border-l-4 [&_blockquote]:border-soft-lavender [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-dark-gray/70
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
                  [&_li]:mb-2 [&_li]:text-dark-gray/80
                ">
                  <PortableText value={post.body} />
                </div>
              )}
            </article>
          ) : null}
        </div>
      </div>
    </main>
  );
}
