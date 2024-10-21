import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation, type StaticGenerateHandler } from "@builder.io/qwik-city";
import { getBlogPost, getBlogPosts } from "..";

export default component$(() => {
  const location = useLocation();
  const [yymm, slug] = location.params.all.split("/");
  const Story =
    getBlogPost(yymm, slug)?.module.default ?? (() => <div>Not found</div>);
  return (
    <>
      <article class="mx-auto my-16 w-[600px]">
        <Story />
      </article>
      <footer class="my-10 text-center text-xs italic text-gray-500">
        - end -
      </footer>
    </>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different
  const stories = getBlogPosts();

  return {
    params: stories.map((s) => ({
      all: s.link,
    })),
  };
};

export const head: DocumentHead = {
  title: "yllan's stories: ",
  meta: [
    {
      name: "description",
      content: "Live stories of yllan",
    },
  ],
};
