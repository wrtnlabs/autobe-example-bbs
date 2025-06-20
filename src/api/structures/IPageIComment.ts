import { IPage } from "./IPage";
import { IComment } from "./IComment";

/**
 * A standard paginated response containing a list of comment objects and
 * pagination metadata.
 *
 * This type matches the generic paging container IPage<T> from standards, where
 * T is IComment, supporting consistent pagination and navigation UI across
 * endpoints.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIComment = {
  pagination: IPage.IPagination;

  /**
   * An array of IComment objects for the given page/search query.
   *
   * This array provides the actual comment data retrieved according to the
   * applied filters and pagination inputs.
   */
  data: IComment[];
};
