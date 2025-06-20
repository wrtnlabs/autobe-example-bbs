import { tags } from "typia";

/**
 * A user-moderation report on a comment, signaling possible rule violation.
 *
 * Implements evidence and workflow for community self-moderation as described
 * in requirements and Prisma schema for comment_reports.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type ICommentReport = {
  /**
   * Primary key of comment_reports; unique identifier for the comment report
   * event.
   *
   * As defined in Prisma for full audit trails.
   */
  id: string & tags.Format<"uuid">;

  /** The ID of the comment being reported. */
  comment_id: string & tags.Format<"uuid">;

  /** The reporting user's unique ID. */
  reporter_id: string & tags.Format<"uuid">;

  /**
   * Reason string for the report, e.g., 'spam', 'off-topic', or free-form
   * explanation.
   */
  reason: string;

  /**
   * Current moderation status for the report: 'pending', 'resolved',
   * 'dismissed'. Used by moderator dashboard workflows.
   */
  status: string;

  /** When the report event was created. */
  created_at: string & tags.Format<"date-time">;

  /**
   * Timestamp when this report was resolved, if any. Null if still open.
   *
   * Audit field for workflow tracking.
   */
  resolved_at?: (string & tags.Format<"date-time">) | null;
};
export namespace ICommentReport {
  /**
   * Request object structure for searching, filtering, paginating, and
   * sorting comment report records for moderation workflows.
   *
   * All fields correspond to normalized data and audit needs from the
   * comment_reports database model.
   */
  export type IRequest = {
    /** The unique identifier of the comment being reported (comments.id). */
    comment_id?: string & tags.Format<"uuid">;

    /** User ID of the reporting user. */
    reporter_id?: string & tags.Format<"uuid">;

    /** Reason for reporting the comment (partial or filterable match). */
    reason?: string;

    /** Current status of the report (pending/resolved/dismissed). */
    status?: string;

    /** Earliest report creation timestamp for filtering. */
    created_at?: string & tags.Format<"date-time">;

    /** Latest resolution timestamp for filtering. */
    resolved_at?: string & tags.Format<"date-time">;

    /** Sorting (e.g., '-created_at', 'status'). */
    sort?: string;

    /** Paging: page number. */
    page?: number &
      tags.Type<"int32"> &
      tags.JsonSchemaPlugin<{
        format: "uint32";
      }>;

    /** Paging: items per page. */
    limit?: number &
      tags.Type<"int32"> &
      tags.JsonSchemaPlugin<{
        format: "uint32";
      }>;
  };

  /**
   * Structure for creating a new comment report entry for moderation.
   *
   * Collects all evidence fields necessary for auditing flagged content and
   * enforcing rules.
   */
  export type ICreate = {
    /** ID of the comment being reported (target for the moderation event). */
    comment_id: string & tags.Format<"uuid">;

    /** ID of the user reporting the comment. */
    reporter_id: string & tags.Format<"uuid">;

    /** Reason entered for the report, as per moderation rules. */
    reason: string;
  };

  /**
   * Allow moderators/admins to update report status, reason, or mark as
   * resolved (timestamped). Includes only atomic mutable fields for strict
   * audit compliance and workflow transitions.
   */
  export type IUpdate = {
    /** (Optional) Update report reason. */
    reason?: string;

    /** (Optional) Update moderation status ('pending', 'resolved', etc.). */
    status?: string;

    /** (Optional) Set timestamp of resolution for the moderation report. */
    resolved_at?: (string & tags.Format<"date-time">) | null;
  };
}
