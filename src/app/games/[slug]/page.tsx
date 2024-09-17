import {unstable_noStore, unstable_noStore as noStore} from 'next/cache';
import {getPostBySlug, getAllPosts, getRelatedPosts} from '@/utils/lib/posts';
import Section from '@/components/Section';
import ContentBox from '@/components/ContentBox';
import PostCard from '@/components/PostCard';
import styles from './page.module.scss';
import GameHead from "@/components/GameHead";
import Player from "@/components/Player";
import CommentForm from "@/components/CommentForm/CommentForm";
import {Metadata} from "next";
import appConfig from "@/utils/lib/config";

if (!appConfig.export) {
  unstable_noStore();
}

export const metadata: Metadata = {
  title: "",
};

export default async function Post({params}: { params: { slug: string } }) {

  const {post} = await getPostBySlug(params?.slug);
  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  if (post.seo) {
    metadata.title = post.seo.title;
    metadata.description = post.seo.description;
  }

  const {category: relatedCategory, posts: relatedPosts} =
  (await getRelatedPosts(post.categories, post.postId)) || {};
  const relatedPostsList = relatedPosts || {};

  return (
    <div className="page">
      <GameHead
        post={post}
      >
        <h1
          dangerouslySetInnerHTML={{
            __html: post.title,
          }}
        />
      </GameHead>

      <Section>
        <ContentBox>
          <div
            className={'content'}
            dangerouslySetInnerHTML={{
              __html: post.csOptionsPost.shortDescription,
            }}
          />
        </ContentBox>
      </Section>

      <Section>
        <Player
          options={post.csOptionsPost}
        >
        </Player>
      </Section>

      <Section>
        <ContentBox>
          <div
            className={'content'}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </ContentBox>
      </Section>

      <Section>
        {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
          <ul className="games-grid">
            {relatedPostsList.map((post) => (
              <li className="games-grid__item" key={post.slug}>
                <PostCard post={post}/>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="comments" title="Comments">
        <CommentForm postId={post.postId}/>
      </Section>

      <Section>
        <div className="columns columns--side-right">
          {/* <CommentForm postID={post.databaseId} /> */}
          <div className="promo">
            Promo
          </div>
        </div>
      </Section>

    </div>
  );
}

export async function generateStaticParams() {
  // Only render the most recent posts to avoid spending unecessary time
  // querying every single post from WordPress

  // Tip: this can be customized to use data or analytitcs to determine the
  // most popular posts and render those instead

  const posts = await getAllPosts({
    queryIncludes: 'index',
  });

  if (!posts) {
    return [];
  }

  const paths = posts
    .filter(({slug}) => typeof slug === 'string')
    .map(({slug}) => ({
      slug,
    }));

  return paths;
}
