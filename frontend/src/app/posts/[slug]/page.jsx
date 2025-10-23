import { client } from '../../../sanity/client';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '../../../sanity/image';

const postQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title, mainImage, body, publishedAt, author->{name, bio, image}, categories[]->{title}
}
`;

export default async function PostPage({ params }) {
    const { slug } = await params;

  const post = await client.fetch(postQuery, { slug });
  if (!post) return <div className="p-6">Not found</div>;

  return (
    <article className="prose prose-invert lg:prose-lg mx-auto p-6">
      <h1 className="font-bold">{post.title}</h1>
      <p className="text-gray-500 text-xs mb-4">{new Date(post.publishedAt).toDateString()}</p>
      {(post.author?.name || post.categories?.length > 0) && (
        <p className="text-gray-400 text-sm mb-6">
          {post.author?.name && <span>By {post.author.name}</span>}
          {post.categories?.length > 0 && (
            <span>
              {' · '}
              {post.categories.map((cat) => cat.title).join(', ')}
            </span>
          )}
        </p>
      )}
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(1200).height(600).url()}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-lg mb-8"
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