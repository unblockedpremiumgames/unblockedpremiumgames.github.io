import appConfig from "@/utils/lib/config";
import CategoryLayout from "@/app/c/[slug]/layout";
import {getAllCategories, getCategoryBySlug} from '@/utils/lib/categories';
import {getPaginatedPostsByCategoryId} from '@/utils/lib/posts';
import {unstable_noStore} from "next/cache";

import TemplateArchive from '@/templates/TemplateArchive';
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "",
};

export default async function Category({ params }: { params: { slug: string } }) {
  if (!appConfig.export) {
    unstable_noStore();
  }

  const {category} = await getCategoryBySlug(params.slug);

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

  const {posts, pagination} = await getPaginatedPostsByCategoryId(id);
  pagination.basePath = '/c/' + slug;

  return <CategoryLayout>
  <TemplateArchive
    title={title}
    posts={posts}
    pagination={pagination}
    slug={slug}
    content={content}
  />
  </CategoryLayout>;
}
