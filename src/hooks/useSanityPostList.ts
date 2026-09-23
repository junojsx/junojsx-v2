import { useEffect, useState } from "react";
import { ALL_POSTS_QUERY } from "@/lib/queries";
import type { SanityPost } from "@/types";

let cachedPosts: SanityPost[] | null = null;
let inflight: Promise<SanityPost[]> | null = null;

function fetchAllPosts(): Promise<SanityPost[]> {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? "n5l953ie";
  const query = encodeURIComponent(ALL_POSTS_QUERY);
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/production?query=${query}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => (json.result ?? []) as SanityPost[]);
}

export function useSanityPostList() {
  const [posts, setPosts] = useState<SanityPost[]>(() => cachedPosts ?? []);
  const [loading, setLoading] = useState(() => cachedPosts === null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cachedPosts !== null) return;

    if (!inflight) {
      inflight = fetchAllPosts()
        .then((p) => {
          cachedPosts = p;
          inflight = null;
          return p;
        })
        .catch(() => {
          inflight = null;
          throw new Error("fetch failed");
        });
    }

    inflight
      .then((p) => {
        setPosts(p);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
        setError(true);
      });
  }, []);

  return { posts, loading, error };
}
