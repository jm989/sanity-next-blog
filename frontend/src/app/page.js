import Link from 'next/link';
import Image from 'next/image';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';

export const revalidate = 0;          // disable ISR cache
export const dynamic = 'force-dynamic'; // ensure dynamic rendering

const listQuery = `
*[_type=="post"] | order(publishedAt desc)[0...20]{
  _id, title, slug, mainImage, publishedAt, excerpt, featured
}
`;

export default async function Home() {
  const posts = await client.fetch(listQuery);

  const featured = posts.find(p => p.featured);
const regularPosts = posts.filter(p => !p.featured);

  if (!posts?.length) {
    return <main className="p-6">No posts yet. Add some in Sanity Studio.</main>;
  }

  return (
  <main className="mx-auto max-w-5xl p-6 space-y-10">
    <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

    {featured && (
      <Link
        href={`/posts/${featured.slug?.current ?? ''}`}
        className="block group"
      >
        <div className="relative overflow-hidden rounded-lg border border-zinc-800">
          {featured.mainImage && (
            <Image
              src={urlFor(featured.mainImage).width(1200).height(600).url()}
              alt={featured.title}
              width={1200}
              height={600}
              className="object-cover w-full h-72 group-hover:opacity-90 transition"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
            <span className="mb-2 w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-300 backdrop-blur-sm group-hover:text-indigo-200">
  Featured
</span>
            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition">
              {featured.title}
            </h2>
            {featured.excerpt && (
              <p className="text-sm text-zinc-300 mt-2 max-w-xl">
                {featured.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    )}

    <section>
      <h2 className="text-xl font-semibold mb-4">More Posts</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {regularPosts.map((p) => (
          <li
            key={p._id}
            className="border border-zinc-800 rounded-lg overflow-hidden hover:border-indigo-400 transition"
          >
            <Link href={`/posts/${p.slug?.current ?? ''}`}>
              {p.mainImage && (
                <Image
                  src={urlFor(p.mainImage).width(800).height(400).url()}
                  alt={p.title}
                  width={800}
                  height={400}
                  className="object-cover w-full h-48"
                />
              )}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.excerpt && (
                  <p className="text-sm text-zinc-400 line-clamp-3">
                    {p.excerpt}
                  </p>
                )}
                {p.publishedAt && (
                  <p className="text-xs text-zinc-500">
                    {new Date(p.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </main>
);
}