import { client } from '../../../sanity/client';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '../../../sanity/image';

const postQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title, mainImage, body, publishedAt
}
`;

export default async function PostPage({ params }) {
  const post = await client.fetch(postQuery, { slug: params.slug });
  if (!post) return <div className="p-6">Not found</div>;

  return (
    <article className="prose mx-auto p-6">
      <h1>{post.title}</h1>
      {post.publishedAt && <p>{new Date(post.publishedAt).toDateString()}</p>}
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(1200).height(600).url()}
          alt={post.title}
          width={1200}
          height={600}
        />
      )}
      {post.body && <PortableText value={post.body} />}
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
  return slugs.map((slug) => ({ slug }));
}