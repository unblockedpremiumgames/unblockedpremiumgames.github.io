import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {getAllPosts, getPagesCount, getPaginatedPosts, getPostsByCategoryId} from "@/utils/lib/posts";
import Section from "@/components/Section";
import {getPageByUri} from "@/utils/lib/pages";
import ContentBox from "@/components/ContentBox";
import {unstable_noStore} from "next/cache";
import {Metadata} from "next";
import appConfig from "@/utils/lib/config";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "",
};

export default async function Home() {

  if (!appConfig.export) {
    unstable_noStore();
  }

  const {posts, pagination} = await getPaginatedPosts();
  const page = await getPageByUri('homepage');

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  metadata.title = page.title;
  if (page.seo) {
    metadata.title = page.seo.title;
    metadata.description = page.seo.description;
  }

  const defaultPlayer = {
    flashFullwidth: true,
    flashIframe: '',
  }

  return (
    <div className="page">

      {/*<PlayerHome />*/}

      <Section
        title="All games"
      >
        <ul className="games-grid">
          {posts.map((post) => {
            return (
              <li className="games-grid__item" key={post.slug}>
                <PostCard post={post}/>
              </li>
            );
          })}
        </ul>
        {pagination && (
          <Pagination
            addCanonical={false}
            currentPage={pagination.currentPage}
            pagesCount={pagination?.pagesCount}
            basePath=''
          />
        )}
      </Section>

      <Section>
        <ContentBox>
          <Image
            src={'/home.webp'}
            className="content-box__image"
            alt={metadata.title}
            width={220}
            height={182}
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          />
        </ContentBox>
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const pagesCount = await getPagesCount(posts, 10);

  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { page: String(i + 1) };
  });

  return paths;
}

