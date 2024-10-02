import {ICategory, ICategoryCard} from "@/utils/interfaces/categories";
import {IQueryData} from "@/utils/interfaces/commons";
import {replaceUrlInContent} from "@/utils/helpers/functions";

/**
 * categoryPathBySlug
 */

export function categoryPathBySlug(slug: string) {
  return `/c/${slug}`;
}

/**
 * Map category query to category data
 */

export function mapCategoryData(categoryData: IQueryData = {}): ICategory {
  const {
    databaseId,
    slug,
    name,
    description,
  } = categoryData;

  return {
    id: databaseId,
    slug: slug,
    title: name,
    content: replaceUrlInContent(description),
  };
}

/**
 * Map category query to category card
 */

export function mapCategoryCardData(categoryData: IQueryData = {}): ICategoryCard {
  const {
    databaseId,
    slug,
    name,
  } = categoryData;

  return {
    id: databaseId,
    slug: slug,
    title: name,
  };
}
