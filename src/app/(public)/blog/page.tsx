import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { getPosts, stripHtmlTags } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips pengiriman barang, info logistik, dan update terbaru dari Fardalin Trans.",
};

export default async function BlogPage() {
  const { posts } = await getPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Tips pengiriman, info logistik, dan update terbaru dari Fardalin Trans."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-md py-12 text-center">
              <p className="text-lg text-gray-500">
                Belum ada artikel. Nantikan konten menarik dari kami!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.ID} href={`/blog/${post.slug}`}>
                  <Card hover className="h-full">
                    {post.featured_image && (
                      <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      {stripHtmlTags(post.excerpt)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Baca selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
