'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMetadata } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BlogFilterProps {
  posts: BlogPostMetadata[];
  categories: string[];
}

export default function BlogFilter({ posts, categories }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      {/* Category Filter */}
      <div className="mb-8 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden hover:border-emerald-500 transition-colors"
          >
            <div className="p-6">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium mb-3">
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-2 hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No posts found in this category.
        </div>
      )}
    </>
  );
}