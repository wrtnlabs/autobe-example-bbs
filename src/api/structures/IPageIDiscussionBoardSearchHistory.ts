import { IPage } from "./IPage";
import { IDiscussionBoardSearchHistory } from "./IDiscussionBoardSearchHistory";

/**
 * A paginated container for Discussion Board Search Histories, following the
 * standard IPage<T> convention.
 *
 * Used to provide efficient browsing, filtering, and analytics for user/guest
 * search activity. This schema is referenced in endpoints that display lists of
 * search logs to admins, moderators, or users in account history/analytics
 * UIs.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIDiscussionBoardSearchHistory = {
  /**
   * Pagination metadata object providing details about the current result
   * page, total records, and limits. Essential for UX consistency and
   * analytics.
   */
  pagination: IPage.IPagination;

  /**
   * List of search history record objects. Each represents a single search
   * action and full search context.
   */
  data: IDiscussionBoardSearchHistory[];
};
