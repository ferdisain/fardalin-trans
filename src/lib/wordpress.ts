const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "fardalintrans.wordpress.com";

const API_BASE = `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_URL}`;

export interface WPPost {
  ID: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featured_image: string;
  author: {
    name: string;
  };
  categories: Record<string, { name: string; slug: string }>;
  tags: Record<string, { name: string; slug: string }>;
}

interface WPPostsResponse {
  found: number;
  posts: WPPost[];
}

export async function getPosts(page = 1, perPage = 12): Promise<{
  posts: WPPost[];
  total: number;
}> {
  try {
    const res = await fetch(
      `${API_BASE}/posts/?number=${perPage}&page=${page}&status=publish`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return { posts: [], total: 0 };

    const data: WPPostsResponse = await res.json();
    return { posts: data.posts, total: data.found };
  } catch {
    return { posts: [], total: 0 };
  }
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${API_BASE}/posts/slug:${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data: WPPost = await res.json();
    return data;
  } catch {
    return null;
  }
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
