import { tags } from "typia";

/**
 * Thread-tag assignment record, representing a unique pair linking a tag to a
 * thread. Strictly normalized as an atomic mapping with a unique primary key
 * and join foreign keys. Used for advanced search, filtering, moderation, and
 * dashboard displays as detailed in the requirements and database schema
 * documentation.
 *
 * References: Prisma 'thread_tags' table, normalization details in the ERD.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IThreadTag = {
  /**
   * The unique identifier for this thread-tag assignment.
   *
   * References the primary key of the thread_tags table. Used to address,
   * edit, or remove the tag assignment atomically as required by moderation
   * or tag management rules.
   */
  id: string & tags.Format<"uuid">;

  /**
   * The unique identifier of the associated thread.
   *
   * Foreign key pointing to the threads table. Atomic reference maintained
   * for strict normalization and referential integrity.
   */
  thread_id: string & tags.Format<"uuid">;

  /**
   * The unique identifier of the associated tag.
   *
   * Foreign key referencing the tags table. Used for tag-based filtering,
   * search, and navigation as implemented in the requirements documentation.
   */
  tag_id: string & tags.Format<"uuid">;

  /**
   * Timestamp for when the tag was assigned to the thread.
   *
   * Fulfills audit and moderation requirements for when this mapping was
   * established. Atomic value for history tracking, as stated in Prisma
   * schema comments.
   */
  created_at: string & tags.Format<"date-time">;
};
export namespace IThreadTag {
  /**
   * Request schema for searching, filtering, and paginating thread-tag
   * assignments in the forum.
   *
   * Supports list, audit, and admin workflows by exposing M:N thread/tag
   * linkages with filtering by thread or tag.
   */
  export type IRequest = {
    /**
     * Thread id to filter tag assignments by.
     *
     * Filters response to only include assignments to this thread.
     */
    thread_id?: string & tags.Format<"uuid">;

    /**
     * Tag id to filter thread-tag assignments by.
     *
     * Restricts output to assignments with this specific tag.
     */
    tag_id?: string & tags.Format<"uuid">;

    /**
     * Lower bound (inclusive) for assignment creation timestamp filter.
     *
     * Used to select thread-tag assignments created after a certain date.
     */
    created_from?: string & tags.Format<"date-time">;

    /**
     * Upper bound (inclusive) for assignment creation timestamp filter.
     *
     * Limits the result set to those created before or on this date.
     */
    created_to?: string & tags.Format<"date-time">;

    /** Page number for paging list results. */
    page?: number & tags.Type<"int32"> & tags.Minimum<1>;

    /** Records per page for paging the query response. */
    limit?: number & tags.Type<"int32"> & tags.Minimum<1>;

    /**
     * Sort direction and field for list query. E.g., 'created_at_desc' or
     * 'created_at_asc'.
     */
    sort?: string;
  };

  /**
   * Payload for creating a new thread-tag assignment. Provides atomic linkage
   * between an existing thread and a tag. Enforces strict uniqueness of the
   * (thread_id, tag_id) pair per normalization constraints in the Prisma
   * schema.
   *
   * Maps to thread_tags creation workflows in UI and admin dashboards.
   */
  export type ICreate = {
    /**
     * ID of the thread to which this tag is assigned.
     *
     * Must reference an existing thread in the system. Used in tag
     * assignment creation interfaces and backend validation.
     */
    thread_id: string & tags.Format<"uuid">;

    /**
     * ID of the tag being assigned to the thread.
     *
     * Must reference a valid, unique tag as specified in the tags table.
     * Required for backend validation and interface input.
     */
    tag_id: string & tags.Format<"uuid">;
  };

  /**
   * Payload for updating a thread-tag assignment. Both thread_id and tag_id
   * may be supplied for updates, but any combination must remain unique per
   * normalization and DB constraints. Used for retagging or correcting
   * assignments within admin and moderation tools as described in
   * requirements.
   */
  export type IUpdate = {
    /**
     * ID of the thread to be updated in this assignment (if modifying the
     * pair).
     *
     * Must reference a valid thread. Changing this value requires
     * uniqueness validation against other existing assignments.
     */
    thread_id: string & tags.Format<"uuid">;

    /**
     * ID of the tag to be updated in this assignment (if changing which tag
     * is assigned).
     *
     * References tags table. Update may trigger a new composite uniqueness
     * check in the schema.
     */
    tag_id: string & tags.Format<"uuid">;
  };

  /**
   * Result object for deletion of a thread-tag assignment. Communicates
   * success/failure and supporting message for moderation dashboard or audit
   * trail. Designed as per deletion result conventions in OpenAPI.
   */
  export type IDeleteResult = {
    /**
     * Indicates whether the thread-tag assignment was successfully deleted.
     *
     * True if deletion (removal or soft-remove) succeeded, false if it
     * failed due to constraints or nonexistence.
     */
    success: boolean;

    /**
     * A human-readable message detailing the result of the deletion action.
     *
     * For example, describes success, failure, or additional context like
     * dependent entities or moderation rules.
     */
    message?: string;
  };
}
