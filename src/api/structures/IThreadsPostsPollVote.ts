import { tags } from "typia";

/**
 * Poll vote entity, tracking a user's response to a poll's answer. Central for
 * voting workflows, audit, and analysis. Atomic and immutable, as per
 * poll_votes model.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IThreadsPostsPollVote = {
  /**
   * Primary key for poll_votes record (unique per vote). Atomic identity for
   * each poll vote event.
   *
   * Prisma: poll_votes.id
   */
  id: string & tags.Format<"uuid">;

  /**
   * Reference to the poll containing this vote. Used to aggregate or tally
   * votes.
   *
   * Prisma: poll_votes.poll_id
   */
  poll_id: string & tags.Format<"uuid">;

  /**
   * The chosen option by the voting user. Each vote references one answer.
   *
   * Prisma: poll_votes.poll_option_id
   */
  poll_option_id: string & tags.Format<"uuid">;

  /**
   * User who cast this vote. Used for audit, uniqueness per poll, and
   * anti-fraud.
   *
   * Prisma: poll_votes.user_id
   */
  user_id: string & tags.Format<"uuid">;

  /**
   * Voting timestamp (when event occurred).
   *
   * Prisma: poll_votes.created_at
   */
  created_at: string & tags.Format<"date-time">;
};
export namespace IThreadsPostsPollVote {
  /**
   * Request body for filtering, searching, and paginating poll votes. Used by
   * moderation/admins to audit voting history by poll, option, or user
   * event.
   */
  export type IRequest = {
    /**
     * Filter all votes belonging to a given poll—useful for result
     * analytics and moderation workflows.
     *
     * Prisma: poll_votes.poll_id
     */
    poll_id?: string & tags.Format<"uuid">;

    /**
     * Filter votes by specific poll option (for breakdown/aggregation).
     *
     * Prisma: poll_votes.poll_option_id
     */
    poll_option_id?: string & tags.Format<"uuid">;

    /**
     * Return only votes submitted by this user (user-centric audit/review
     * scenarios).
     *
     * Prisma: poll_votes.user_id
     */
    user_id?: string & tags.Format<"uuid">;

    /**
     * Pagination page number.
     *
     * Applies to audit/review lists.
     */
    page?: number & tags.Type<"int32">;

    /**
     * Number of votes to return per page. Defaults controlled by API for
     * scale.
     *
     * Applies to audit/review lists.
     */
    limit?: number & tags.Type<"int32">;
  };

  /**
   * Request body for creating a new poll vote for a specific poll option, as
   * defined in the `poll_votes` Prisma table.
   *
   * All properties directly correspond to normalized columns in the table,
   * ensuring referential integrity and auditability. This type is used
   * whenever a user submits a vote in a poll and provides all required
   * identifiers for that action.
   *
   * See: poll_votes entity in DB/ERD, voting workflow in requirements.
   */
  export type ICreate = {
    /**
     * The unique identifier of the poll this vote belongs to.
     *
     * References the `polls.id` column in the database. This is required to
     * ensure the vote is correctly linked to the poll, as outlined in the
     * Prisma schema and ERD. Maintains normalization and supports audit
     * trails. Example: 'a01b23c4-d567-8901-e234-56789bcdef01'.
     */
    poll_id: string & tags.Format<"uuid">;

    /**
     * The unique identifier of the selected poll option for this vote.
     *
     * References the `poll_options.id` column in the database. This field
     * is required, enforces referential integrity, and records exactly
     * which option the user selected in the poll, as described in the
     * Prisma schema's 3NF normalization. Example:
     * 'b234cd56-7890-1234-efab-567890abcdef'.
     */
    poll_option_id: string & tags.Format<"uuid">;

    /**
     * The unique identifier of the user casting the poll vote.
     *
     * References the `users.id` column. This field must always reflect a
     * registered user as required for voting, aligned with the platform’s
     * business rules and privacy requirements stated in the schema and
     * requirements documentation.
     */
    user_id: string & tags.Format<"uuid">;
  };

  /**
   * Request body for updating an existing poll vote's selection. Only the
   * poll_option_id can be changed to ensure at most one vote per user per
   * poll as enforced in the DB schema and business requirements.
   *
   * Used for workflows where users switch their vote before the poll closes.
   */
  export type IUpdate = {
    /**
     * The updated poll option ID to change the user's vote selection.
     *
     * References the `poll_options.id` column. Required when updating the
     * poll vote, allowing users to switch their vote choice within an open
     * poll window. Respects single-vote-per-poll business rule from
     * requirements and database schema.
     *
     * Example: Change from 'Option A' to 'Option B' by updating this field.
     */
    poll_option_id: string & tags.Format<"uuid">;
  };
}
