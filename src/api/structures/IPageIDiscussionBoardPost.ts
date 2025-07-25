import { IPage } from "./IPage";
import { IDiscussionBoardPost } from "./IDiscussionBoardPost";

/**
 * Paginated result set for post listings (IPage<Post> pattern). Implements
 * standard OpenAPI paging for IDiscussionBoardPost objects as described in
 * endpoint documentation.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIDiscussionBoardPost = {
  /**
   * Describes the page bounds (current page, size, total, lastPageNum) for
   * this post results page. Used for navigation and user experience.
   */
  pagination: IPage.IPagination;

  /**
   * Page content: array of post objects for this query/slice, following the
   * complete fields for IDiscussionBoardPost according to the OpenAPI model.
   */
  data: IDiscussionBoardPost[];
};
