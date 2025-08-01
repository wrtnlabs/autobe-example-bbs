import { tags } from "typia";

/**
 * Full report record entity for moderation purposes. Covers content reports for
 * posts or comments, includes all moderation metadata. Polymorphic references
 * (post/comment) per schema. Excludes moderation action links (see separate
 * moderation tables for relationships).
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardReport = {
  /** Unique identifier for this report instance. */
  id: string & tags.Format<"uuid">;

  /** ID for reporting member. */
  reporter_id: string & tags.Format<"uuid">;

  /** ID of reported post if type is 'post', else null. */
  reported_post_id?: (string & tags.Format<"uuid">) | null;

  /** ID of reported comment if type is 'comment', else null. */
  reported_comment_id?: (string & tags.Format<"uuid">) | null;

  /** Type of reported content: 'post' or 'comment'. */
  content_type: string;

  /** Text explanation/reason for reporting content. */
  reason: string;

  /** Moderation state: 'pending', 'reviewed', 'resolved', etc. */
  status: string;

  /** Timestamp of report creation. */
  created_at: string & tags.Format<"date-time">;

  /** Time of resolution; null if unresolved. */
  resolved_at?: (string & tags.Format<"date-time">) | null;
};
export namespace IDiscussionBoardReport {
  /**
   * Search/filter and pagination contract for querying discussion board
   * reports. Allows filter by reporter, content type, IDs, reason, status,
   * time window, and paging.
   */
  export type IRequest = {
    /** Filter by reporting member's ID. */
    reporter_id?: string & tags.Format<"uuid">;

    /** Filter by reported object type ("post" or "comment"). */
    content_type?: string;

    /** Reported post ID, used for post-flag reports. */
    reported_post_id?: string & tags.Format<"uuid">;

    /** Reported comment ID, used for comment-flag reports. */
    reported_comment_id?: string & tags.Format<"uuid">;

    /** Keyword or exact match filter for reason string. */
    reason?: string;

    /** Moderation status filter, e.g., 'pending', 'resolved', 'reviewed'. */
    status?: string;

    /** Only reports created after (inclusive) given timestamp. */
    created_from?: string & tags.Format<"date-time">;

    /** Only reports created before (inclusive) given timestamp. */
    created_to?: string & tags.Format<"date-time">;

    /** Page number for pagination. */
    page?: number;

    /** Records per page. */
    limit?: number;
  };

  /**
   * Request body type for creating a new content report. At least one of
   * reported_post_id or reported_comment_id should be set according to
   * content_type enum. Reason is mandatory. See schema documentation for
   * report workflow.
   */
  export type ICreate = {
    /** ID of member creating the report. */
    reporter_id: string & tags.Format<"uuid">;

    /** What type of content is being reported (must be 'post' or 'comment'). */
    content_type: string;

    /** ID of the reported post (required if content_type is 'post'). */
    reported_post_id?: (string & tags.Format<"uuid">) | null;

    /** ID of the reported comment (required if content_type is 'comment'). */
    reported_comment_id?: (string & tags.Format<"uuid">) | null;

    /** Reporter explanation for the report. */
    reason: string;
  };

  /**
   * Summary view of a report for listing/search response. Only exposes fields
   * suitable for browse/search. Used in moderation dashboards for efficient
   * scanning of report status and activity.
   */
  export type ISummary = {
    /** Primary key for the report record. */
    id: string & tags.Format<"uuid">;

    /** Type of content reported. */
    content_type: string;

    /** Report status. */
    status: string;

    /** Time report submitted. */
    created_at: string & tags.Format<"date-time">;

    /** Time report resolved, or null if unresolved. */
    resolved_at?: (string & tags.Format<"date-time">) | null;

    /** Reporter member ID. */
    reporter_id: string & tags.Format<"uuid">;

    /** ID of reported post/comment. Populated per content_type; see schema. */
    target_id?: (string & tags.Format<"uuid">) | null;
  };

  /**
   * Update data structure for a discussion board report. Contains fields that
   * can be changed during moderation, including status, resolution time, and
   * notes per the requirements and Prisma schema.
   */
  export type IUpdate = {
    /**
     * Current moderation status of the report (e.g., 'pending', 'reviewed',
     * 'resolved'). String value restricted to valid business statuses. This
     * is updated by moderators/admins to reflect review progress or
     * closure. Reference: Prisma schema 'status' column in
     * 'discussion_board_reports'.
     */
    status: string;

    /**
     * Explanation/reason for reporting content. Only used in update if the
     * moderator/admin wishes to add or correct admin review notes/reason
     * annotations. Reference: Prisma schema 'reason' column in
     * 'discussion_board_reports'.
     */
    reason?: string;

    /**
     * Timestamp when report was resolved (null if unresolved). Set by
     * business logic when report is closed or a resolution action is taken.
     * Reference: Prisma schema 'resolved_at' column in
     * 'discussion_board_reports'.
     */
    resolved_at?: (string & tags.Format<"date-time">) | null;
  };
}
