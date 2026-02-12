#!/bin/bash
# Simple script to add image support to your blog

echo "Creating image folders..."
mkdir -p public/blog/images
mkdir -p public/blog/images/educational

echo "Creating example blog post with image..."
cat > app/blog/posts/2026-02-12-example-with-image.md << 'BLOGPOST'
---
title: "Example Post with Image"
date: "2026-02-12"
excerpt: "This shows how to add images to your blog posts"
author: "COT Analytics Team"
readTime: "2 min"
category: "Example"
---

# How to Add Images

This post has an image below.

![Example chart](../../public/blog/images/example.png)

That's it! Just reference your image path and it shows up.

## To add your own images:

1. Put image file in: `public/blog/images/your-image.png`
2. In your markdown, write: `![Description](../../public/blog/images/your-image.png)`
3. Done!
BLOGPOST

echo ""
echo "✅ Done! Image support added."
echo ""
echo "What I created:"
echo "  - public/blog/images/               (put your images here)"
echo "  - app/blog/posts/2026-02-12-example-with-image.md  (example post)"
echo ""
echo "To add an image to ANY blog post:"
echo "  1. Copy your image to: public/blog/images/"
echo "  2. In your .md file, add: ![Description](../../public/blog/images/your-image.png)"
echo ""
