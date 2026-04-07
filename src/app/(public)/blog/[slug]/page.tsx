import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { getPost, stripHtmlTags } from "@/lib/wordpress";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: post.title,
    description: stripHtmlTags(post.excerpt).slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {post.featured_image && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-brand-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 border-t border-gray-200 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Blog
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
