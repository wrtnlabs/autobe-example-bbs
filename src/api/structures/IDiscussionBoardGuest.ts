import { tags } from "typia";

/**
 * Analytics record of a single unauthenticated guest session tracked on the
 * board. Holds only session metadata; never personally identifiable info. Used
 * for onboarding, behavior analytics, and reporting. Mirrors schema in Actors
 * domain.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardGuest = {
  /**
   * Unique identifier for guest session, assigned by system. Used for tracing
   * unique visits. (See Prisma: @id @db.Uuid)
   */
  id: string & tags.Format<"uuid">;

  /**
   * Opaque, unique session id for this guest/visit, typically a UUID or
   * cookie-based identifier. Used for analytics and onboarding. (See Prisma:
   * session_identifier, @unique)
   */
  session_identifier: string;

  /**
   * When this guest session was first detected. Reflects creation or first
   * request time. (See Prisma: first_seen_at, @db.Timestamptz)
   */
  first_seen_at: string & tags.Format<"date-time">;

  /**
   * Last activity time detected for guest session. Used for session duration
   * and active/abandoned analysis. (See Prisma: last_seen_at,
   * @db.Timestamptz)
   */
  last_seen_at: string & tags.Format<"date-time">;
};
export namespace IDiscussionBoardGuest {
  /**
   * Filter/pagination controls for guest session search/reporting. All fields
   * optional; filtering supports auditing, onboarding and guest analytics.
   */
  export type IRequest = {
    /**
     * Zero-based page number for pagination; null/empty for first page.
     * Used for fetching specific page in results.
     */
    page?: (number & tags.Type<"int32">) | null;

    /** How many records to return per page. Optional; defaults to 100. */
    limit?: (number & tags.Type<"int32">) | null;

    /**
     * Optional filter: session id of guest. For audit/tracing individual
     * guest sessions.
     */
    session_identifier?: string | null;

    /**
     * Restricts results to sessions with first_seen_at at or after this
     * time. ISO 8601 format.
     */
    first_seen_at_from?: (string & tags.Format<"date-time">) | null;

    /**
     * Restricts results to sessions with first_seen_at at or before this
     * time. ISO 8601 format.
     */
    first_seen_at_to?: (string & tags.Format<"date-time">) | null;

    /**
     * Restricts results to sessions with last_seen_at at or after this
     * time. ISO 8601 format.
     */
    last_seen_at_from?: (string & tags.Format<"date-time">) | null;

    /**
     * Restricts results to sessions with last_seen_at at or before this
     * time. ISO 8601 format.
     */
    last_seen_at_to?: (string & tags.Format<"date-time">) | null;
  };

  /**
   * Request body for registering a new guest session in the tracking table.
   * Only allows establishing a new unique session; not for updating records.
   */
  export type ICreate = {
    /**
     * Opaque string to uniquely identify the guest session. This is
     * typically a random UUID, cookie value, or similar identifier for
     * visitor analytics. Required.
     */
    session_identifier: string;

    /**
     * Timestamp of the moment the guest session was created/first
     * encountered. May be set equal to last_seen_at on creation. ISO 8601
     * string.
     */
    first_seen_at: string & tags.Format<"date-time">;

    /**
     * Timestamp indicating the most recent detected activity for the guest.
     * Should match first_seen_at on creation, may differ for session
     * updates.
     */
    last_seen_at: string & tags.Format<"date-time">;
  };

  /**
   * Fields permitted for updating an existing guest session entity. Used for
   * analytics/statistics/session management. Supports update of
   * identifiers/times only.
   */
  export type IUpdate = {
    /**
     * Update for session identifier if needed (rare; generally
     * system-managed, but allowed for session reconciliation or import).
     */
    session_identifier?: string | null;

    /**
     * Correct creation time for guest session (for historical data
     * correction or audits).
     */
    first_seen_at?: (string & tags.Format<"date-time">) | null;

    /**
     * Update for the most recent activity time detected for guest session.
     * Typically used for session keep-alive and analytics refresh.
     */
    last_seen_at?: (string & tags.Format<"date-time">) | null;
  };
}
