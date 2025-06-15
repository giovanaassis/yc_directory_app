import { StartupCardType } from "@/app/components/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import View from "@/app/components/View";

// export const experimental_ppr = true;

const md = markdownit();

export default async function StartupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post: StartupCardType = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  const parsedContent = md.render(post.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <p className="tag tag-tri">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container flex items-center justify-center w-full flex-col">
        {post.image && post.author?.image && (
          <>
            <Image
              src={post.image}
              alt="startup-thumbnail"
              className="rounded-xl"
              width={700}
              height={300}
            />

            <div className="space-y-5 mt-10 max-w-4xl mx-auto lg:w-[700px] md:w-[700px]">
              <div className="flex-between gap-5">
                <Link
                  href={`/user/${post.author?._id}`}
                  className="flex gap-2 items-center mb-3"
                >
                  <Image
                    src={post.author?.image}
                    alt="author avatar"
                    width={64}
                    height={64}
                    className="rounded-full drop-shadow-lg aspect-square"
                  />

                  <div>
                    <p className="text-20-medium">{post.author.name}</p>
                    <p className="text-16-medium !text-black-300">
                      @{post.author.username}
                    </p>
                  </div>
                </Link>

                <div>
                  <p className="category-tag">{post.category}</p>
                </div>
              </div>

              <h3 className="text-30-bold">Pitch Details</h3>
              {parsedContent ? (
                <article
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                  className="prose max-w-4xl break-all"
                />
              ) : (
                <p className="no-result">No details provided.</p>
              )}
            </div>

            <hr className="divider" />
          </>
        )}
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
}
