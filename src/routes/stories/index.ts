import * as v from "valibot";
import { routeLoader$ } from "@builder.io/qwik-city";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type MdxContent = typeof import("*.mdx");
const STORIES: Record<string, MdxContent> = import.meta.glob(
  "/src/stories/*.mdx",
  { eager: true },
);

const PostSchema = v.object({
  title: v.string(),
  description: v.string(),
  slug: v.string(),
  draft: v.optional(v.boolean()),
  date: v.string(),
});

export const getBlogPosts = () =>
  Object.entries(STORIES)
    .map(([path, content]) => {
      const frontmatter = v.parse(PostSchema, content.frontmatter);
      const { date, slug } = frontmatter;
      const link = date + "/" + slug;
      return {
        path,
        ...frontmatter,
        module: content,
        link,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

export const getBlogPost = (yyyymmdd: string, slug: string) => {
  const post = getBlogPosts().find(
    (p) => p.slug === slug && p.date === yyyymmdd,
  );
  return post;
};

export const useStories = getBlogPosts;

export const useStory = routeLoader$(({ params }) => {
  const [yyyymmdd, slug] = params.all.split("/");
  return getBlogPost(yyyymmdd, slug);
});
