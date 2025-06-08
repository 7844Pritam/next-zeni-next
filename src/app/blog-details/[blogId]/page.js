import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";
import BlogDetailsClient from "./BlogDetailsClient";

export async function generateMetadata({ params }) {
  const blogId = params.blogId;

  try {
    const blogRef = doc(db, "blogs", blogId);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      return {
        title: "Blog Not Found",
        description: "The blog you're looking for does not exist.",
      };
    }

    const blog = blogSnap.data();

    return {
      title: blog.title || "Untitled Blog",
      description: blog.subtitle || "Check out this blog post.",
      openGraph: {
        title: blog.title || "Untitled Blog",
        description: blog.subtitle || "Check out this blog post.",
        url: `https://next-zeni-next.vercel.app/blog-details/${blogId}`,
        images: blog.image
          ? [
              {
                url: blog.image,
                width: 1200,
                height: 630,
                alt: blog.title || "Blog preview",
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title || "Untitled Blog",
        description: blog.subtitle || "Check out this blog post.",
        images: blog.image ? [blog.image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error.message);
    return {
      title: "Blog Error",
      description: "There was a problem generating blog metadata.",
    };
  }
}

export default function Page({ params }) {
  return <BlogDetailsClient blogId={params.blogId} />;
}
