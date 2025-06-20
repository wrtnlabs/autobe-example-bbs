import { tags } from "typia";

/**
 * Represents a unique, atomic mapping of a user to a role per the
 * 'role_assignments' table in the Prisma schema. This entity enables true
 * many-to-many RBAC linkage, fully supporting permission enforcement, auditing,
 * and admin UIs.
 *
 * Each row documents exactly who received which role, when, and enables all
 * moderation escalations, user privilege changes, and security reviews across
 * the board.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IRoleAssignment = {
  /**
   * Unique identifier for the role assignment record as described in the
   * 'role_assignments' Prisma schema. This is the primary key in the
   * role_assignments table.
   *
   * Used for updating, deleting, and referencing assignment records in admin
   * UIs.
   */
  id: string & tags.Format<"uuid">;

  /**
   * UUID of the user being granted this role. Enforces referential integrity
   * to the users table per 3NF normalization rules, supporting audit,
   * security, and management workflows.
   */
  user_id: string & tags.Format<"uuid">;

  /**
   * UUID of the role granted to the user. References the roles table,
   * enforcing RBAC via atomic relationship as described in business rules.
   *
   * Allows for consistent and unique mapping from users to system
   * access/control levels.
   */
  role_id: string & tags.Format<"uuid">;

  /**
   * Timestamp (ISO 8601 UTC) when the role assignment was granted to the
   * user. Implements full audit traceability in the role_assignments table as
   * specified in the audit and business rules sections.
   *
   * Important for stepwise escalation, dispute resolution, and transparency
   * requirements.
   */
  assigned_at: string & tags.Format<"date-time">;
};
export namespace IRoleAssignment {
  /**
   * Payload for filtering, searching, and paginating user role assignment
   * records. Reflects the need for audit/query flexibility found in the
   * 'role_assignments' table's documentation and related business rules.
   *
   * All filters map to atomic fields, ensuring database queries remain
   * normalized and performant for admin or RBAC management UIs.
   */
  export type IRequest = {
    /**
     * Unique identifier (UUID) of the user whose role assignments are being
     * searched, as defined in the 'role_assignments' table in Prisma. This
     * is used for filtering or narrowing query results to a specific user's
     * roles.
     *
     * Referenced directly from the 'user_id' column, ensures atomic and
     * normalized queries by user in admin UIs.
     */
    user_id?: string & tags.Format<"uuid">;

    /**
     * UUID of the role being searched/filtered. Matches the 'role_id' in
     * the role_assignments table, enforcing RBAC linkage consistency.
     *
     * Allows retrieval of all users with a particular role, as required in
     * admin and audit scenarios.
     */
    role_id?: string & tags.Format<"uuid">;

    /**
     * Date range filter for the 'assigned_at' timestamp, allowing admin UIs
     * to query assignments given in a particular period.
     *
     * Directly references the audit and transparency requirement in the
     * business logic (see requirement analysis: moderation/audit needs).
     */
    assigned_at_range?: {
      /**
       * Start (inclusive) of assignment date range filter, in ISO 8601
       * format. Used to search for assignments created after this
       * timestamp.
       */
      from?: string & tags.Format<"date-time">;

      /**
       * End (inclusive) of assignment date range filter, in ISO 8601
       * format. Used to search for assignments created before or at this
       * time.
       */
      to?: string & tags.Format<"date-time">;
    };

    /**
     * Sort key for ordering role assignments. Refers to sortable atomic
     * fields as supported by the underlying Prisma schema and database
     * indices.
     *
     * Essential for ensuring admin UI/API flexibility.
     */
    sort_by?: "assigned_at" | "user_id" | "role_id";

    /**
     * Direction of sort: ascending or descending. Always defaults to 'asc'
     * per standard admin interface conventions.
     *
     * Works with sort_by to guarantee fully customizable audit views.
     */
    sort_order?: "asc" | "desc";

    /**
     * Pagination parameter: page number to retrieve (1-based index). Part
     * of the standard pagination support in admin APIs, referencing best
     * practices for scalable queries.
     */
    page?: number &
      tags.Type<"int32"> &
      tags.JsonSchemaPlugin<{
        format: "int32";
      }>;

    /**
     * Pagination parameter: number of records to return per page.
     * Implements the standard default and max-limit for scalable result
     * sets in admin/admin-like lists.
     */
    limit?: number &
      tags.Type<"int32"> &
      tags.JsonSchemaPlugin<{
        format: "int32";
      }>;
  };

  /**
   * Payload for creating a new user role assignment, corresponding to atomic
   * insertions into the 'role_assignments' table.
   *
   * Enforces all structural rules about atomic linkage between users and
   * roles as detailed in normalized RBAC practices and the Prisma
   * documentation.
   */
  export type ICreate = {
    /**
     * UUID of the user to be assigned a role. This must reference a real
     * user, ensuring referential integrity in the database as per schema
     * comments.
     */
    user_id: string & tags.Format<"uuid">;

    /**
     * UUID of the role to assign. Must reference an existing role in the
     * roles table, as enforced by foreign key and business logic.
     */
    role_id: string & tags.Format<"uuid">;
  };

  /**
   * Update payload for role assignment records. All fields correspond to
   * strictly atomic and updatable columns as per the role_assignments table
   * and system business logic. Enables admin workflows for correcting,
   * auditing, or escalating user roles.
   */
  export type IUpdate = {
    /**
     * (Optional) Set a new user ID, referencing an existing user. Allows
     * reassigning the role assignment if required by admin policy changes.
     *
     * Directly maps to the 'user_id' field in role_assignments table.
     */
    user_id?: string & tags.Format<"uuid">;

    /**
     * (Optional) Set a new role ID, referencing an existing role. Permits
     * admin-driven correction or escalation/demotion workflows.
     *
     * Must correspond to actual roles table entries, aligned with RBAC best
     * practices.
     */
    role_id?: string & tags.Format<"uuid">;

    /**
     * (Optional) Update the assignment timestamp to reflect administrative
     * changes or error corrections. Fully auditable per system transparency
     * rules.
     *
     * References 'assigned_at' in Prisma's role_assignments schema.
     */
    assigned_at?: string & tags.Format<"date-time">;
  };
}
