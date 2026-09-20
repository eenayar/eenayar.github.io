import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Rayane Kadi'),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    coverImage: image(),
  }),
});

export const collections = {
  blog,
};
