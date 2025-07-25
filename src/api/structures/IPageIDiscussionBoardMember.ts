import { IPage } from "./IPage";
import { IDiscussionBoardMember } from "./IDiscussionBoardMember";

/**
 * Paginated result wrapper for member search/list API, matching advanced
 * listing, analytics, and admin UI requirements for flexible exploration as per
 * platform conventions.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIDiscussionBoardMember = {
  /**
   * Paging metadata for member search results (current page, record count,
   * navigation fields). Strictly aligns with ERD and UX platform
   * requirements.
   */
  pagination: IPage.IPagination;

  /**
   * Array of member entity results matching the search criteria, strictly
   * typed per the member schema.
   */
  data: IDiscussionBoardMember[];
};
