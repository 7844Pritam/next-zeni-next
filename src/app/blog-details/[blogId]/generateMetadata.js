import { adminDb } from '@/lib/firebaseAdmin';

export async function generateMetadata({ params }) {
  const { blogId } = params;

  try {
    const blogDoc = await adminDb.collection('blogs').doc(blogId).get();
    if (!blogDoc.exists) return {};

    const blog = blogDoc.data();

    return {
      title: blog.title,
      description: blog.description || blog.subtitle || "",
      openGraph: {
        title: blog.title,
        description: blog.description || blog.subtitle || "",
        url: `https://next-zeni-next.vercel.app/blog-details/${blogId}`,
        images: [
          {
            url: blog.image || '/default-og-image.jpg',
            width: 1200,
            height: 630,
            alt: `${blog.title} preview`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.description || blog.subtitle || "",
        images: [blog.image || '/default-og-image.jpg'],
      },
    };
  } catch (err) {
    console.error('Error generating metadata:', err);
    return {};
  }
}
