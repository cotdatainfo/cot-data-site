import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMetadata } from '@/lib/types';
import { extractExcerpt } from './markdown';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

/**
 * Calculate read time based on word count
 * Assumes ~200 words per minute
 */
function calculateReadTime(content: string): string {
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 200);
  
  if (readTimeMinutes < 1) {
    return 'Less than 1 min read';
  }
  return `${readTimeMinutes} min read`;
}

/**
 * Get all blog post slugs
 */
export function getBlogPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post: BlogPost = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      category: data.category || 'General',
      content,
      excerpt: data.excerpt || extractExcerpt(content),
      readTime: calculateReadTime(content),
    };

    return post;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts metadata (without full content)
 */
export function getAllBlogPosts(): BlogPostMetadata[] {
  const slugs = getBlogPostSlugs();
  
  const posts = slugs
    .map((slug) => {
      const post = getBlogPostBySlug(slug);
      if (!post) return null;

      const metadata: BlogPostMetadata = {
        slug: post.slug,
        title: post.title,
        date: post.date,
        tags: post.tags,
        category: post.category,
        excerpt: post.excerpt,
        readTime: post.readTime,
      };
      return metadata;
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * Get blog posts filtered by tag
 */
export function getBlogPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get blog posts filtered by category
 */
export function getBlogPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories from all posts
 */
export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categoriesSet = new Set<string>();
  
  allPosts.forEach((post) => {
    categoriesSet.add(post.category);
  });
  
  return Array.from(categoriesSet).sort();
}
