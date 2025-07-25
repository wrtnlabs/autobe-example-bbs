import { tags } from "typia";

/**
 * System configuration key-value pair for the discussion board platform
 * (discussion_board_configurations table).
 *
 * Each record stores a unique runtime, operational, or feature flag setting for
 * the board. All fields are atomic (never derived). The model is used in admin
 * dashboards, configuration management panels, and audit logs. All operations
 * on configuration are role-restricted to administrators.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardConfiguration = {
  /**
   * Unique identifier (UUID) for the configuration record.
   *
   * References the primary key in discussion_board_configurations. Required
   * for all entity operations; used for audit and traceability.
   */
  id: string & tags.Format<"uuid">;

  /**
   * Configuration key (unique name for the configuration value).
   *
   * Represents the identity of the system setting, feature flag, or runtime
   * parameter. Example: 'allow_guest_posting', 'max_post_length'. Key must be
   * unique and atomic as explained in the Prisma model comments.
   */
  key: string;

  /**
   * Actual value for the configuration key.
   *
   * May be a literal string or a JSON-serialized structure. Stores the
   * current operational, feature, or system setting, as required by
   * administrator UI and audit compliance.
   */
  value: string;

  /**
   * Human-readable description or annotation of the configuration row.
   *
   * Describes what the value controls or any special operational context for
   * the setting. Used in admin panels. Optional.
   */
  description?: string | null;

  /**
   * Timestamp (ISO 8601) when the configuration record was created.
   *
   * Provides audit trail support, required for compliance. Always UTC format.
   */
  created_at: string & tags.Format<"date-time">;

  /**
   * Timestamp (ISO 8601) when the configuration was last updated.
   *
   * Tracks changes for rollback/compliance. Always UTC.
   */
  updated_at: string & tags.Format<"date-time">;
};
export namespace IDiscussionBoardConfiguration {
  /**
   * Request payload for searching, filtering, or paginating configuration
   * key-value records in the discussion_board_configurations table. All
   * fields are optional; used by admin panels and audit dashboards to
   * retrieve specific system settings or search for keys/values. The design
   * aligns with 3NF by only referencing atomic search criteria. Pagination
   * enabled for performance and usability.
   */
  export type IRequest = {
    /**
     * Page number for pagination.
     *
     * Optional. If provided, must be a positive integer. Default handled by
     * backend (often 1).
     */
    page?: (number & tags.Type<"int32">) | null;

    /**
     * Number of records per page (pagination limit).
     *
     * If provided, must be a positive integer. Typical defaults come from
     * system config (e.g., 20 or 100).
     */
    limit?: (number & tags.Type<"int32">) | null;

    /**
     * Search filter for configuration key (exact or partial).
     *
     * If set, restricts results to configuration rows matching the provided
     * key or pattern.
     */
    key?: string | null;

    /**
     * Optional filter for configuration value (by match/substring).
     *
     * If provided, narrows search to configurations by current value
     * content.
     */
    value?: string | null;

    /**
     * Optional search filter for configuration row's description field.
     *
     * Used in admin UIs or audit dashboards for filtering by explanatory
     * text.
     */
    description?: string | null;
  };

  /**
   * Request body for creating a new configuration record.
   *
   * Maps to the discussion_board_configurations table. The business logic and
   * application backend enforce uniqueness and content validation rules.
   * Description is optional but recommended for audit and usability.
   */
  export type ICreate = {
    /**
     * Configuration key (unique within system).
     *
     * Examples: 'max_post_length', 'enable_dark_mode'. Enforced unique.
     * Used in code and admin UIs.
     */
    key: string;

    /**
     * Configuration value for the key. Must be valid for the referenced
     * system feature or logic.
     *
     * Examples: '1000', 'true', '{"flag": true}'.
     */
    value: string;

    /**
     * Optional human-readable description for admin/audit dashboards and
     * operational clarity.
     *
     * If specified, helps future admins understand the role and
     * implications of this config key.
     */
    description?: string | null;
  };

  /**
   * Request payload to update a configuration row in the system.
   *
   * Used by administrators to update runtime or operational parameters.
   * Changing the key is allowed only if uniqueness can be preserved.
   * Description update is optional.
   */
  export type IUpdate = {
    /**
     * Update of configuration key (must remain unique across all records).
     *
     * Changing the key is optional and subject to uniqueness constraints.
     * Typically only updated in error correction scenarios.
     */
    key: string;

    /**
     * New configuration value to apply. Must conform to the feature's
     * requirements or expected type (e.g., numeric limit, boolean flag, or
     * serialized JSON).
     */
    value: string;

    /** Optional update to description for clarity, audit, or usability. */
    description?: string | null;
  };
}
