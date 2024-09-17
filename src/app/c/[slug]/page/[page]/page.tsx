import {getAllCategories, getCategoryBySlug} from '@/utils/lib/categories';
import {getPagesCount, getPaginatedPostsByCategoryId, getPostsByCategoryId} from '@/utils/lib/posts';

import TemplateArchive from '@/templates/TemplateArchive';
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "",
};

export default async function CategoryPage({params}: { params: { slug: string, page: string } }) {

  console.log('123');
  console.log(params);

  const {category} = await getCategoryBySlug(params.slug);

  console.log(category);

  if (!category) {
    return {};
  }

  if (category.seo) {
    metadata.title = category.seo.title;
    metadata.description = category.seo.description;
  }

  const {id, title, content, slug} = category;

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const {posts, pagination} = await getPaginatedPostsByCategoryId(id, parseInt(params.page));
  pagination.basePath = '/c/' + slug;

  console.log(pagination);

  return <TemplateArchive
    title={title}
    posts={posts}
    pagination={pagination}
    slug={slug}
    content={content}
  />;
}

export async function generateStaticParams({params}: {
  params: { slug: string}
}) {
  console.log(params);
  const {category} = await getCategoryBySlug(params.slug);

  if (!category) {
    return [];
  }

  const {id} = category;
  const posts = await getPostsByCategoryId(id);

  if (!posts) {
    return [];
  }

  const pagesCount = await getPagesCount(posts, 10);

  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { page: String(i + 1) };
  });

  console.log(paths);

  return paths;
}
