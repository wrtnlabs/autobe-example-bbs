import { IPage } from "./IPage";
import { IDiscussionBoardContentFlag } from "./IDiscussionBoardContentFlag";

/**
 * Paginated result set of discussion board content flag records for moderation
 * tracking and audit history.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIDiscussionBoardContentFlag = {
  pagination: IPage.IPagination;
  data: IDiscussionBoardContentFlag[];
};
export namespace IPageIDiscussionBoardContentFlag {
  /**
   * A page of content flag summaries, including full pagination information
   * and item summaries for moderation audit, review, and compliance.
   */
  export type ISummary = {
    pagination: IPage.IPagination;
    data: IDiscussionBoardContentFlag.ISummary[];
  };
}
