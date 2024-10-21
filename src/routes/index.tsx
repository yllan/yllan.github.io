import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useStories } from "./stories/";

const humanDate = (yyyymmdd: string) => {
  const [, mm, dd] = yyyymmdd.split("-");
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][parseInt(mm) - 1];
  return `${month} ${dd}`;
};

export default component$(() => {
  const posts = useStories();
  return (
    <div class="mx-auto mt-16 w-[600px]">
      <header class="w-lg my-12">
        <h1 class="my-4 text-4xl font-black">
          <ruby>
            藍<rt>Nâ</rt>
          </ruby>
          <ruby>
            永倫<rt>íng-lûn</rt>
          </ruby>
          ê
          <ruby>
            故事<rt>kòo-sū</rt>
          </ruby>
        </h1>

        <section class="py-2">目前正學習如何當一對兒女的爸爸。</section>
        <section class="py-2">
          曾和朋友一起開過公司，上過雜誌，擔任 iPlayground 的 keynote
          speaker，加入過新創，玩過程式比賽，寫過在某族群間還算有名的工具軟體，服過兵役，念過大學，和朋友一起創立台灣城市單車聯盟，舉辦過沈默騎行、台北裸騎，擔任單車通勤日站長，單車臨界量常客，考過台語認證中高級，兩發各抽中一番賞A、B獎，帶環義冠軍搭捷運⋯⋯。有機會想把這些故事寫下來。
        </section>

        <section class="py-2">
          最近的興趣是腳踏車、寫程式、學
          <ruby>
            台語<rt>tâi-gì</rt>
          </ruby>
          。
        </section>
      </header>
      <main class="">
        <h2 class="my-4 text-2xl font-bold">2024</h2>
        <menu>
          {posts.map((post, idx) => (
            <Link key={idx} href={"/stories/" + post.link} class="my-4 block">
              <div class="flex items-baseline hover:underline">
                <h2 class="max-w-md overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {post.title}
                </h2>

                <hr class="mx-2 flex-shrink-0 flex-grow border-0 border-b border-dotted border-gray-600" />
                <time>{humanDate(post.date)}</time>
              </div>
              <p class="mt-1 line-clamp-2 max-w-[480px] text-justify text-xs font-extralight leading-5 text-gray-500 no-underline">
                {post.description}
              </p>
            </Link>
          ))}
        </menu>
      </main>
      <footer class="my-10 text-center text-xs italic text-gray-500">
        - 1 -
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "yllan's stories",
  meta: [
    {
      name: "description",
      content: "Live stories of yllan",
    },
  ],
};
