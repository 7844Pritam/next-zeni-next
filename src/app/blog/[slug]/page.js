// app/blog/[slug]/page.js
import Image from "next/image";

// Dummy blog data
const blogPosts = {
  "post-one": {
    title: "First Blog Post",
    description: "This is the first dummy blog post.",
    image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  "post-two": {
    title: "Second Blog Post",
    description: "This is the second dummy blog post.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj8sKRgBGHeqyyzcVzby3YrHH_s0KVk-PozzvgrCdsueqkbhorjmZ0cByvks-Oy9tK38M&usqp=CAU",
  },
  "post-three": {
    title: "Third Blog Post",
    description: "This is the third dummy blog post.",
    image: "https://placehold.co/1200x630?text=Blog+3",
  },
};

export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug];

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://next-zeni-next.vercel.app/blog/${params.slug}`, 
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: `${post.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPost({ params }) {
  const post = blogPosts[params.slug];

  if (!post) return <h1>Post not found</h1>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={420}
        className="rounded mb-4"
      />
      <p>{post.description}</p>
    </div>
  );
}
