import Link from 'next/link';
import { getAllBlogPosts, getAllCategories } from '@/lib/utils/blog';
import { formatDate } from '@/lib/utils';
import BlogFilter from '@/components/BlogFilter';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">COT Trading Blog</h1>
        <p className="text-text-muted">
          Educational articles and analysis on Commitment of Traders data
        </p>
      </div>

      {/* Category Filter - Client Component */}
      <BlogFilter posts={blogPosts} categories={categories} />

      {/* Info Box */}
      <div className="mt-12 bg-extreme-blue/10 border border-extreme-blue/30 rounded-lg p-6">
        <h3 className="font-semibold mb-2 flex items-center">
          <span className="mr-2">💡</span>
          About Our Blog
        </h3>
        <p className="text-sm text-text-secondary">
          Our blog provides educational content on interpreting COT data, understanding market positioning, 
          and applying these insights to trading strategies. All content is for educational purposes only 
          and should not be considered financial advice.
        </p>
      </div>
    </div>
  );
}
