import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/utils/blog';
import { markdownToHtml } from '@/lib/utils/markdown';
import { formatDate } from '@/lib/utils';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | COT Dashboard Blog`,
    description: post.excerpt || `Read about ${post.title}`,
    keywords: post.category,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-text-secondary hover:text-bullish-green transition-colors mb-6"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Blog
      </Link>

      {/* Article Header */}
      <article className="bg-navy-lighter rounded-lg border border-navy-border p-8 md:p-12">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-bullish-green/10 text-bullish-green text-xs font-semibold rounded-full mb-4">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        {/* Date */}
        <p className="text-sm text-text-muted mb-6">{formatDate(post.date)}</p>

        {/* Category */}
        <div className="mb-8 pb-8 border-b border-gray-700">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="px-6 py-3 bg-bullish-green hover:bg-bullish-green/90 text-navy-dark font-semibold rounded-lg transition-colors"
        >
          View All Posts
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-navy-lighter rounded-lg border border-navy-border text-center">
        <p className="text-xs text-text-muted">
          This article is for educational purposes only and does not constitute financial advice.
          Always consult with a qualified financial advisor before making trading decisions.
        </p>
      </div>
    </div>
  );
}
