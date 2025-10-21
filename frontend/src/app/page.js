import Link from 'next/link';
import Image from 'next/image';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';

const listQuery = `
*[_type=="post"] | order(publishedAt desc)[0...20]{
  _id, title, slug, mainImage, publishedAt
}
`;

export default async function Home() {
  const posts = await client.fetch(listQuery);

  if (!posts?.length) {
    return <main className="p-6">No posts yet. Add some in Sanity Studio.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="grid gap-6">
        {posts.map((p) => (
          <li key={p._id} className="border rounded-lg p-4">
            <Link href={`/posts/${p.slug?.current ?? ''}`}>
              <div className="space-y-2">
                {p.mainImage && (
                  <Image
                    src={urlFor(p.mainImage).width(800).height(400).url()}
                    alt={p.title}
                    width={800}
                    height={400}
                  />
                )}
                <h2 className="text-xl font-semibold">{p.title}</h2>
                {p.publishedAt && (
                  <p className="text-sm opacity-70">
                    {new Date(p.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}